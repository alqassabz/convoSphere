import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const UserProfile = () => {
  const { id } = useParams()
  const [user, setUser] = useState(null)
  const [isFollowing, setIsFollowing] = useState(false)

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/auth/user/${id}`
        )
        setUser(response.data.data)
        console.log('testing user data', response.data)
      } catch (error) {
        console.error('Error fetching user:', error)
      }
    }

    getUser()
  }, [id])

  return (
    <div className="user-container">
      {user ? (
        <div className="user-details">
          <h1 className="user-name">{user.name}</h1>
          <img className="profile-image" src={`http://localhost:3001${user.image}`} alt={user.name} />
          <p className="user-info">Email: {user.email}</p>
          <p className="user-info">Followers: {user.followers.length}</p>
          <p className="user-info">Following: {user.following.length}</p>
          {/* <button
            className="follow-button"
            onClick={isFollowing ? handleUnfollow : handleFollow}
          >
            {isFollowing ? 'Unfollow' : 'Follow'}
          </button> */}
        </div>
      ) : (
        <p>Loading user information...</p>
      )}
    </div>
  )
}

export default UserProfile
