import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const RightSideBar = ({ isOpen, toggleSidebar }) => {
  const [following, setFollowing] = useState([])

  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get(
          'http://localhost:3001/user/following', 
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        )
        setFollowing(response.data)
      } catch (error) {
        console.error('Error fetching following:', error)
      }
    }

    fetchFollowing()
  }, [])

  return (
    <div className={`rightSidebar ${isOpen ? 'open' : ''}`}>
      <div className="rightSidebar-content">
        <button className="close-btn" onClick={toggleSidebar}>
          ×
        </button>
        <h3>Following</h3>
        <div className="following-list">
          {following.map((user) => (
            <Link
              to={`/profile/${user._id}`}
              key={user._id}
              className="following-item"
            >
              <div className="friend-name">{user.name}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RightSideBar