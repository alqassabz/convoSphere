import { useState, useEffect } from 'react';
import axios from 'axios';
import { HiReply } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom'

const Users = ({
  getUsers,
  users,
  user
}) => {

    const BASE_URL = 'http://localhost:3001'
  const [filteredUsers, setFilteredUsers] = useState([]);

  // Fetch users on component mount
  useEffect(() => {
    getUsers();
    getUsers()
  }, []);

  console.log(user)

  

  // Filter users based on the search term whenever users or searchTerm change
  // useEffect(() => {
  //   // Only filter if users have been loaded
  //   if (users.length > 0) {
  //     const filtered = users.filter(user =>
  //       user.name.toLowerCase().includes(searchTerm.toLowerCase())
  //     );
  //     setFilteredUsers(filtered);
  //   } else {
  //     // Reset filtered users if no users exist
  //     setFilteredUsers([]);
  //   }
  // }, [searchTerm, users]);

  useEffect (()=>{
getUsers()
  },[])

  return (
    <>
      <h1>Users</h1>
      <div className='boxes'>
        {users ? (
          users.map((user) => (
            <Link to={`/user/${user._id}`}>
            <div className='box' key={user._id}>
              <div className="box-header">
                <div className='user-icon'>
                  {/* <img src={`/public/${user.image}.png`} alt={`${user.name} icon`} /> */}
                </div>
                <h3>{user.name}</h3>
              </div>
              <p className="email">{user.email}</p>
            </div>
            </Link>
          ))
        ) : (
          <p>No users found.</p>
        )}
      </div>
    </>
  );
};

export default Users;
