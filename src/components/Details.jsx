import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

const CommunityDetails = ({ communities }) => {

  let { id } = useParams()

  const [community, setCommunity] = useState('')

  useEffect(() => {
    let selectedCommunity = communities.find((community) => (
      community._id === id // Compare as string
    ))
    setCommunity(selectedCommunity)
  }, [communities, id])

  useEffect(() => {
    if (communities.length > 0) {
      let selectedCommunity = communities.find((community) => (
        community._id === id
      ))
      setCommunity(selectedCommunity)
    }
  }, [communities, id])

  return community ? (
    <div className="detail">
      <div className="detail-header">
      <img src={`/public/${community.icon}.png`} alt={`${community.name} icon`} />

        <div className="listing-name">
          <h1>{community.name}</h1>
          <p>{community.description}</p>
        </div> 
      </div>
      <div className="info-wrapper">
        <div className="listing-header">
          <h2>Sections:</h2>
          {community.fields.map((field)=>(
            <div className='sections'>
              <div>
            <h3> {field.name}</h3>
            <p> {field.description}</p>
            </div>
            <div>
              <button className='viewComments-btn'>
              <NavLink to="/comment">View Comments</NavLink>
              </button>
            </div>
            </div>
          ))}
        </div>
        
      </div>
      <button className='goBack'>
        <NavLink to="/">Back</NavLink>
      </button>
    </div>
  ) : null
}

export default CommunityDetails
