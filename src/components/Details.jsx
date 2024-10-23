import { useEffect, useState } from 'react'
import { useParams, Link, NavLink } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CommunityDetails = ({ communities, user }) => {
  const navigate = useNavigate()
  let { id } = useParams()
  const [community, setCommunity] = useState(null)

  const handleJoin = async () => {
    try {
      if (community && user) {
        const joinUrl = `http://localhost:3001/community/join/${community._id}`
        let res = await axios.put(joinUrl, user)
        alert('You have successfully joined the community!')
        setCommunity(res.data.comm)
      } else {
        alert('User or community information is missing.')
      }
    } catch (err) {
      console.error('Error joining community:', err)
    }
  }

  const handleUnjoin = async () => {
    console.log(community)
    try {
      if (community && user) {
        const joinUrl = `http://localhost:3001/community/unjoin/${community._id}`
        let res = await axios.put(joinUrl, user)
        console.log(res.data.comm)
        setCommunity(res.data.comm)
        console.log(community)
        alert('You have successfully unjoined the community!')
      } else {
        alert('User or community information is missing.')
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleDelete = async () => {
    const deleteUrl = `http://localhost:3001/community/${community._id}`
    await axios.delete(deleteUrl, user)
    navigate('/')
  }

  useEffect(() => {
    const selectedCommunity = communities.find(
      (community) => community._id === id
    )
    if (selectedCommunity) {
      setCommunity(selectedCommunity)
    } else {
      console.error('Community not found')
    }
  }, [communities, id]) // This runs only when the `communities` or `id` changes, no unnecessary re-renders

  // Log the community when it updates (for debugging, can be removed later)
  useEffect(() => {
    if (community) {
      console.log('Community updated:', community)
    }
  }, [community]) // This useEffect will only run when `community` changes

  return user && community ? (
    <div className="detail">
      <div className="detail-header">
        <img
          src={`/public/${community.icon}.png`}
          alt={`${community.name} icon`}
        />

        <div className="listing-name">
          <h1>{community.name}</h1>
          <p>{community.description}</p>
          {community.participants.findIndex(
            (participant) => participant.id === user.id
          ) === -1 ? ( // explicitly check if index is -1
            <div>
              <Link to="#" onClick={handleJoin}>
                Join Community
              </Link>
            </div>
          ) : (
            <div>
              <Link to="#" onClick={handleUnjoin}>
                Unjoin Community
              </Link>
            </div>
          )}
          <div>
            <Link to="#" onClick={handleDelete}>
              Delete Community
            </Link>
            <Link to={`/community/update/${id}`}>update</Link>
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
                  <NavLink to={`/comment/${field._id}`}>View Comments</NavLink>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="info-wrapper">
          <div className="listing-header">
            <h1>Participants</h1>
            <ul>
              {community.participants.map((participant) => (
                <Link to={`/user/${participant.id}`}>
                  {' '}
                  <li>{participant.name}</li>
                </Link>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <button className="goBack">
        <NavLink to="/">Back</NavLink>
      </button>
    </div>
  ) : (
    navigate('/register')
  )
}

export default CommunityDetails
