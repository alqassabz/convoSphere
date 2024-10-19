import { Link } from 'react-router-dom';
import Search from './Search';

const Nav = ({ user, handleLogout, toggleSidebar, searchTerm, setSearchTerm }) => {
  const publicOptions = (
    <nav>
      <button className="toggler" onClick={toggleSidebar}>
        ☰
      </button>
      <div>
        <Link to="/">Home</Link>
        <Link to="/form">Add Community</Link>
        <Link to="/comment">Comments</Link>
      </div>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} /> {/* Add Search Component */}
    </nav>
  );

  return (
    <header>
      {publicOptions}
    </header>
  );
};

export default Nav;
