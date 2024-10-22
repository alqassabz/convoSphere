import { Link } from 'react-router-dom'
import Search from './Search'


const Nav = ({
  user,
  handleLogout,
  toggleSidebar,
  searchTerm,
  setSearchTerm
}) => {
  console.log(user)

  const publicOptions = (
    <nav>
      <button className="toggler" onClick={toggleSidebar}>
        ☰
      </button>
      <div>
        <h3>Welcome, {user ? user.name : 'Guest'}!</h3>
        {user && user.image ? (
          <img src={user.image} alt={`${user.name}'s profile`} />
        ) : (
          <div>No image available</div>
        )}
      </div>
      <div>
        <Link to="/">Home</Link>
        <Link to="/form">Add Community</Link>
        <Link to="/comment">Comments</Link>
      </div>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div>
      {user ? (
          <>
          <Link to="/user">User Profile</Link>
          <Link onClick={handleLogout}>Sign Out</Link>
          </>
        ) : (
          <>
            <Link to="/register">Register</Link>
            <Link to="/signin">Sign In</Link>
          </>
        )}
      </div>
    </nav>
  )

  return (
    <header>
      <Link to="/">
        <div className="logo-wrapper" alt="logo"></div>
      </Link>
      {publicOptions}
    </header>
  )
}

export default Nav