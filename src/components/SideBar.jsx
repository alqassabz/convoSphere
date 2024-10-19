const SideBar = ({ isOpen, toggleSidebar, communities }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      
      <div className="list">
        <button className="close-btn" onClick={toggleSidebar}>×</button>
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