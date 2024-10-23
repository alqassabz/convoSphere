import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

const RightSideBar = ({ isOpen, toggleSidebar, user }) => {
  const [following, setFollowing] = useState(null)

  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          throw new Error('No token found')
        }

        // Decode the token to get user information
        const decodedToken = jwtDecode(token)
        const userId = decodedToken.id // or the appropriate key for your user ID

        const response = await axios.get(
          `http://localhost:3001/auth/user/following/${userId}`,
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
          {following
            ? following?.map((u) => (
                <Link
                  to={`auth/user/${u._id}/follow`}
                  key={u._id}
                  className="following-item"
                >
                  <div className="friend-name">{u.name}</div>
                </Link>
              ))
            : null}
        </div>
      </div>
    </div>
  )
}

export default RightSideBar
