import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';


const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  // const [showFollowers, setShowFollowers] = useState(false);
  // const [showFollowing, setShowFollowing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/auth/user/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        
        const fetchedUser = response.data.data;
        setUser(fetchedUser);
        
        
        const token = localStorage.getItem('token');
        const decodedToken = token ? jwtDecode(token) : null;
        const loggedInUserId = decodedToken ? decodedToken.id : null;

        
        if (loggedInUserId && fetchedUser.followers.some(follower => follower._id === loggedInUserId)) {
          setIsFollowing(true);
        } else {
          setIsFollowing(false);
        }

      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    getUser();
  }, [id]);

  const handleUserClick = (userId) => {
    if (user.followers.some(follower => follower._id === userId) || user.following.some(followed => followed._id === userId)) {
      navigate('/user/me'); 
    } else {
      navigate(`/user/${userId}`); 
    }
  }

  const handleFollow = async () => {
    try {
      await axios.put(`http://localhost:3001/auth/user/${user._id}/follow`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      
      setIsFollowing(true);
    } catch (error) {
      console.error('Error following user:', error);
    }
  };

  const handleUnfollow = async () => {
    try {
      await axios.put(`http://localhost:3001/auth/user/${user._id}/unfollow`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setIsFollowing(false);
    } catch (error) {
      console.error('Error unfollowing user:', error);
    }
  };

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
              <li key={follower._id} onClick={() => handleUserClick(follower._id)}>
                {follower.name}
              </li>
            ))}
          </ul>

          <p className="user-info">Following: {user.following.length}</p>
          <ul className='userList'>
            {user.following.map(followed => (
              <li key={followed._id} onClick={() => handleUserClick(followed._id)}>
                {followed.name}
              </li>
            ))}
          </ul>
          <div className="follow-button-container">
  {isFollowing ? (
    <button className="follow-button unfollow" onClick={handleUnfollow}>
      Unfollow
    </button>
  ) : (
    <button className="follow-button follow" onClick={handleFollow}>
      Follow
    </button>
  )}
</div>

        </div>
      ) : (
        <p>Loading user information...</p>
      )}
    </div>
  );
};

export default UserProfile;
