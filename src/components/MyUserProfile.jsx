import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const MyUserProfile = () => {
  const [user, setUser] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const getUserProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        
        console.error('No token');
        return;
      }
  
      try {
        const response = await axios.get('http://localhost:3001/auth/user/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        setUser(response.data.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        
      }
    };
  
    getUserProfile();
  }, []);

  return (
    <div className="user-container">
      {user ? (
        <div className="user-details">
          <h1 className="user-name">{user.name}</h1>
          <img className="profile-image" src={`http://localhost:3001${user.image}`} alt={user.name} />
          <p className="user-info">Email: {user.email}</p>
          <p className="user-info">Followers: {user.followers.length}</p>
          <ul>
            {user.followers.map(follower => (
              <li key={follower._id}>
                <Link to={`/user/${follower._id}`}>{follower.name}</Link>
              </li>
            ))}
          </ul>
          <p className="user-info">Following: {user.following.length}</p>
          <ul>
            {user.following.map(followed => (
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
  )
}


export default MyUserProfile
