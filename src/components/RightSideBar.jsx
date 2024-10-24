import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const RightSideBar = ({ isOpen, toggleSidebar, user }) => {
  const [following, setFollowing] = useState(null);

  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token || !user) { 
          setFollowing(null);
          return;
        }

        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;

        const response = await axios.get(
          `http://localhost:3001/auth/user/following/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        setFollowing(response.data);
      } catch (error) {
        console.error('Error fetching following:', error);
      }
    };

    fetchFollowing();
  }, [user]);

  return (
    <div className={`rightSidebar ${isOpen ? 'open' : ''}`}>
      
      <div className="rightSidebar-content">
        <button className="close-btn" onClick={toggleSidebar}>
          ×
        </button>
        <h3>Following</h3>
        <div className="following-list">
          {following
            ? following.map((u) => (
                <Link
                  to={`/user/${u._id}`}
                  key={u._id}
                  className="following-item"
                >
                  <img

                    className="profile-image"
                    src={`http://localhost:3001${u.image}`}
                    alt={u.name}

                    className="profile-image2"
                    src={`http://localhost:3001/${u.image}`} // Prefix the image path with the server URL
                    alt={`${u.name}'s profile`}

                  />
                  <div className="friend-name">{u.name}</div>
                </Link>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default RightSideBar;
