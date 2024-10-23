import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom' // Import useNavigate
const MyUserProfile = ({ getCommunities, communities }) => {
  const [user, setUser] = useState(null)
  const [isFollowing, setIsFollowing] = useState(false)
  const navigate = useNavigate() // Initialize useNavigate

  const userCommunities = user
    ? communities.filter((com) => com.creator === user.email)
    : []

  const handleDelete = async (communityId) => { // Accept communityId as parameter
    const deleteUrl = `http://localhost:3001/community/${communityId}` // Use the passed communityId
    try {
      await axios.delete(deleteUrl, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Include the token for authorization
        },
      })
      // Optionally, refresh the communities after deletion
      getCommunities()
      navigate('/') // Redirect after deletion
    } catch (error) {
      console.error('Error deleting community:', error)
    }
  }

  useEffect(() => {
    const getUserProfile = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        console.error('No token')
        return
      }

      try {
        const response = await axios.get('http://localhost:3001/auth/user/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        setUser(response.data.data)
      } catch (error) {
        console.error('Error fetching user profile:', error)
      }
    }
    getUserProfile()
  }, [])

  useEffect(() => {
    getCommunities()
  }, [])

  return (
    <>
      <div className="user-container">
        {user ? (
          <div className="user-details">
            <h1 className="user-name">{user.name}</h1>
            <img
              className="profile-image"
              src={`http://localhost:3001${user.image}`}
              alt={user.name}
            />
            <p className="user-info">Email: {user.email}</p>
            <p className="user-info">Followers: {user.followers.length}</p>
            <ul>
              {user.followers.map((follower) => (
                <li key={follower._id}>
                  <Link to={`/user/${follower._id}`}>{follower.name}</Link>
                </li>
              ))}
            </ul>
            <p className="user-info">Following: {user.following.length}</p>
            <ul>
              {user.following.map((followed) => (
                <li key={followed._id}>
                  <Link to={`/user/${followed._id}`}>{followed.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>Loading user information...</p>
        )}
      </div>
      <div>
        <h1>Communities Created by You</h1>
        <div className="boxes">
          {userCommunities.length > 0 ? (
            userCommunities.map((com) => (
              <div className="box" key={com._id}>
                <div className="box-header">
                  <div className="community-icon">
                    <img
                      src={`/public/${com.icon}.png`}
                      alt={`${com.name} icon`}
                    />
                  </div>
                  <h3>{com.name}</h3>
                </div>
                <p className="description">{com.description}</p>
                <p className="creator">Created by: {com.creator}</p>
                <div>
                  <Link to="#" onClick={() => handleDelete(com._id)}>
                    Delete Community
                  </Link>
                  <Link to={`/community/update/${com._id}`}>Update</Link>
                </div>
              </div>
            ))
          ) : (
            <p>You have not created any communities.</p>
          )}
        </div>
      </div>
    </>
  )
}

export default MyUserProfile
