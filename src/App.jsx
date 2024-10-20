import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Form from './components/Form'; // Correct import
import axios from 'axios';
import { useState, useEffect } from 'react';
// import { get } from 'mongoose';
import Comment from './components/Comment';
import Nav from './components/Nav';
import SideBar from './components/SideBar';

function App() {
  const [issues, setIssues] = useState([]);
  const [communities, setCommunities] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [searchTerm, setSearchTerm] = useState(''); // Manage search term state

  const [user, setUser] = useState(null)
  const handleLogout = () => {
    //Reset all auth related state and clear localStorage
    setUser(null)
    localStorage.clear()
  }

  const getIssues = async () => {
    try {
      let res = await axios.get('http://localhost:3001/issues');
      console.log('Fetched issues:', res.data);
      setIssues(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  
  
  const getCommunities = async () => {
    try {
      let res = await axios.get('http://localhost:3001/communities');
      console.log('Fetched communities:', res.data); // Check the fetched data
      setCommunities(res.data);
    } catch (err) {
      console.error('Error fetching communities:', err);
    }
  };
  

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar open/close state
  };

  useEffect(() => {
    getIssues();
    getCommunities()
  }, []);

  return (
    <div className="App">
      <Nav user={user} handleLogout={handleLogout} toggleSidebar={toggleSidebar} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} communities={communities} />
      <main className={isSidebarOpen ? 'shifted' : ''}>
        <Routes>
          <Route path="/" element={<Home getIssues={getIssues} issues={issues} setIssues={setIssues} getCommunities={getCommunities} communities={communities} setCommunities={setCommunities} searchTerm={searchTerm} />} />
          <Route path="/form" element={<Form getCommunities={getCommunities} communities={communities} setCommunities={setCommunities} />} /> {/* This should work */}
          <Route path="/comment" element={<Comment getIssues={getIssues} issues={issues} setIssues={setIssues}  />} /> {/* This should work */}
        </Routes>
      </main>
    </div>
  );
}

export default App;
