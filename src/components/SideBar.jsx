const SideBar = ({ isOpen, toggleSidebar, communities }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="close-btn" onClick={toggleSidebar}>×</button>
      <div className="list">
      <h3>Communities</h3> {/* Optional header for the community list */}
      <ul>
        {communities.map((community, index) => (
          <li key={index}>{community.name}</li>  
        ))}
      </ul>
      </div>
    </div>
  );
};

export default SideBar