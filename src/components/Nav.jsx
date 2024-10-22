import { Link } from 'react-router-dom';
import Search from './Search';

const Nav = ({
  user,
  handleLogout,
  toggleSidebar,
  searchTerm,
  setSearchTerm
}) => {
  console.log(user);
  if (user) {
    console.log(`image is`, user.image);
  }

  const publicOptions = (
    <nav>
      <button className="toggler" onClick={toggleSidebar}>
        ☰
      </button>
      <div className="user-info">
        <h3>Welcome, {user ? user.name : 'Guest'}!</h3>
        {user && user.image ? (
          <img
            className="user-image"
            src={`http://localhost:3001${user.image}`}
            alt={`${user.name}'s profile`}
          />
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
          <Link onClick={handleLogout}>Sign Out</Link>
        ) : (
          <>
            <Link to="/register">Register</Link>
            <Link to="/signin">Sign In</Link>
          </>
        )}
      </div>
    </nav>
  );

  return (
    <header>
      <Link to="/">
        <div className="logo-wrapper" alt="logo"></div>
      </Link>
      {publicOptions}
    </header>
  );
}

export default Nav;
