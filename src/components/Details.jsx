import { useEffect, useState } from 'react'
import { useParams, Link, NavLink } from 'react-router-dom'
import axios from 'axios'

const CommunityDetails = ({ communities, user }) => {
  let { id } = useParams()
  const [community, setCommunity] = useState(null)

  const handleJoin = async () => {
    try {
      if (community && user) {
        const joinUrl = `http://localhost:3001/community/join/${community._id}`
        await axios.put(joinUrl, user)
        alert('You have successfully joined the community!')
      } else {
        alert('User or community information is missing.')
      }
    } catch (err) {
      console.error('Error joining community:', err)
    }
  }

  useEffect(() => {
    const selectedCommunity = communities.find(
      (community) => community._id === id
    )
    setCommunity(selectedCommunity)
  }, [communities, id])

  return community ? (
    <div className="detail">
      <div className="detail-header">
        <img
          src={`/public/${community.icon}.png`}
          alt={`${community.name} icon`}
        />

        <div className="listing-name">
          <h1>{community.name}</h1>
          <p>{community.description}</p>
          <div>
            <Link to="#" onClick={handleJoin}>
              Join Community
            </Link>
          </div>
        </div>
      </div>

      <div className="info-wrapper">
        <div className="listing-header">
          <h2>Sections:</h2>
          {community.fields.map((field) => (
            <div className="sections" key={field.name}>
              <div>
                <h3>{field.name}</h3>
                <p>{field.description}</p>
              </div>
              <div>
                <button className="viewComments-btn">
                  <NavLink to="/comment">View Comments</NavLink>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button className="goBack">
        <NavLink to="/">Back</NavLink>
      </button>
    </div>
  ) : null
}

export default CommunityDetails
