import { Link } from 'react-router-dom'

const Nav = ({ user, handleLogout, toggleSidebar }) => {
  

  const publicOptions = (
    <nav>
      {/* <div>
        <h3>helloooooo!! {user ? 
        (user.name):null}</h3>
      </div> */}
      <button className="toggler" onClick={toggleSidebar}>
          ☰
        </button>
      <div>
        <Link to="/">Home</Link>
        <Link to="/form">Add Community</Link>
        <Link to="/comment">Comments</Link>
      </div>
      <div></div>
    </nav>
  )

  return (
    <header>
      {publicOptions}
    </header>
  )
}

export default Nav