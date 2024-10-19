import { useState, useEffect } from 'react'
import axios from 'axios'
import { HiReply } from 'react-icons/hi' // Import the reply icon

const Home = ({
  getIssues,
  issues,
  setIssues,
  getCommunities,
  communities,
  setCommunities
}) => {

  useEffect(()=>{
getCommunities()
  },[])
  

  return (
    <div>
      <h1>Newest Community</h1>
      <div>
      {communities.length > 0 && (
        <div className="box-big">
          <div className="box-header-big">
            <div className='community-icon-big'>
            <img src={`/public/${communities[communities.length - 1].icon}.png`} alt={`${communities[communities.length - 1].name} icon`} /></div>
            <h3>{communities[communities.length - 1].name}</h3>
          </div>
          <p className="description-big">{communities[communities.length - 1].description}</p>
          <p className="creator-big">{communities[communities.length - 1].email}</p>
        </div>
      )}
      </div>
      <h1>Communities</h1>
      <div className='boxes'>
        {communities.map((community) => (
          <div className='box' key={community._id}>
          <div className="box-header">
            <div className='community-icon'>
            <img src={`/public/${community.icon}.png`} alt={`${community.name} icon`} /></div>
            <h3>{community.name}</h3>
          </div>
          <p className="description">{community.description}</p>
          <p className="creator">{community.email}</p>
        </div>
        ))}
      </div>

      
    </div>
  );
};

export default Home;
