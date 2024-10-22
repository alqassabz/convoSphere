import axios from "axios";
import { useEffect, useState } from "react"
import { IoTimeSharp } from "react-icons/io5";

const UserProfile =  () =>{
      const [user, setUser] = useState([]);
      const [isFollowing, setIsFollowing] = useState()

     
      
      useEffect(()=>{
        
        const getUser = async () =>{
          const token = localStorage.getItem('token')
          try{
            const response = await axios.get(`http://localhost:3001/auth/user`, {
              headers: {
                Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
              },
            });
            setUser(response.data.user)
            console.log(response.data.user)
            
          }catch (error){
            console.error('Error fetching items:', error)
            
          }
          
        }
        getUser()
        
      },[])


  const handleFollow = async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:3001/auth/${user.id}/follow`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data.user);
      setIsFollowing(true); // Update local state
    } catch (error) {
      console.error('Error following user:', error);
    }
  };

  const handleUnfollow = async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:3001/auth/${user.id}/unfollow`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data.user);
      setIsFollowing(false); // Update local state
    } catch (error) {
      console.error('Error unfollowing user:', error);
    }
  };




      return (
        <>
        <div className="user-container">
        <div className="user-details">
          <h1 className="user-name">{user.name}</h1>
          <img className="user-image" src={user.image} alt={user.name} />
          <p className="user-info">Email: {user.email}</p>
          <p className="user-info">Followers: {user.followers}</p>
          <p className="user-info">Following: {user.following}</p>
          <button className="follow-button" onClick={isFollowing ? handleUnfollow : handleFollow}>
            {isFollowing ? 'Unfollow' : 'Follow'}
          </button>
        </div>
      
    </div>
  

         
          



        
        
        
        </>
      )





}

export default UserProfile
