import { Link } from 'react-router-dom'

const SideBar = ({ isOpen, toggleSidebar, communities }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="list">
        <button className="close-btn" onClick={toggleSidebar}>
          ×
        </button>
        <h3>Communities</h3>
        <ul>
          {communities.map((community, index) => (
            <Link to={`/listings/${community._id}`} key={index}>
              <li>{community.name}</li>
            </Link>
          ))}
        </ul>
        <div className="list">
          <Link to="/people">View All Members</Link>
        </div>
      </div>
    </div>
  )
}

export default SideBar