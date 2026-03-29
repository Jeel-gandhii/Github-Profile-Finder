import React, { useState, useRef } from 'react'
import "./Githubsearch.css"
import axios from "axios"

const GithubSearch = () => {

    const [username, setusername] = useState('')
    const [profile, setprofile] = useState(null)
    const [error, seterror] = useState(null)
    const [darkMode, setDarkMode] = useState(true); // Dark mode by default

    const profileRef = useRef(null);

    const handlesubmit = async (e) => {
        e.preventDefault()
        if (!username) return
        try {
            const response = await axios.get(`https://api.github.com/users/${username}`)
            setprofile(response.data)
            seterror(null)
        } catch {
            setprofile(null)
            seterror("User not found")
        }
    }

    return (
        <div className={`main-container ${darkMode ? "dark" : "light"}`}>
            
            {/* Dark/Light Mode Button */}
            <button
                className="theme-btn-icon"
                onClick={() => setDarkMode(!darkMode)}
                title="Toggle Dark/Light Mode"
            >
                {darkMode ? "☀️" : "🌙"}
            </button>

            <h1>Github Profile Finder</h1>

            <form className="child" onSubmit={handlesubmit}>
                <input
                    type="text"
                    placeholder="Enter GitHub username"
                    value={username}
                    onChange={(e) => setusername(e.target.value)}
                    required
                />
                <button type="submit">Search</button>
            </form>

            {error && <p className='error-msg'>{error}</p>}

            {profile && (
                <>
                    <div className="profile-container" ref={profileRef}>
                        <div className="profile-img">
                            <img src={profile.avatar_url} alt="avatar" className='profile-avatar' />
                        </div>
                        <div className="profile-details">
                            <h2>{profile.name || profile.login}</h2>
                            <span>Joined: {new Date(profile.created_at).toDateString()}</span>
                            <h4>ID: {profile.id}</h4>
                            <p>{profile.bio || "No bio available"}</p>

                            <div className="repo-box">
                                <div className="repository">
                                    <h5>Repositories</h5>
                                    <span>{profile.public_repos}</span>
                                </div>
                                <div className="Followers">
                                    <h5>Followers</h5>
                                    <span>{profile.followers}</span>
                                </div>
                                <div className="Following">
                                    <h5>Following</h5>
                                    <span>{profile.following}</span>
                                </div>
                            </div>

                            <div className="extra-detail-box">
                                <div className="location">📍 {profile.location || "Not available"}</div>
                                <div className="companyname">🏢 {profile.company || "Not available"}</div>
                            </div>

                            <div className="socialmediahandler">
                                <a href={profile.html_url} target="_blank" rel="noreferrer">
                                    View GitHub Profile
                                </a>
                            </div>
                        </div>
                    </div>

                </>
            )}
        </div>
    )
}

export default GithubSearch