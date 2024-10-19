import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Form from './components/Form'; // Correct import
import axios from 'axios';
import { useState, useEffect } from 'react';
// import { get } from 'mongoose';
import Comment from './components/Comment';

function App() {
  const [issues, setIssues] = useState([]);
  const [communities, setCommunities] = useState([]);

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
      console.log('Fetched issues:', res.data);
      setCommunities(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getIssues();
    getCommunities()
  }, []);

  return (
    <div className="App">
      <main>
        <Routes>
          <Route path="/" element={<Home getIssues={getIssues} issues={issues} setIssues={setIssues} getCommunities={getCommunities} communities={communities} setCommunities={setCommunities} />} />
          <Route path="/form" element={<Form getCommunities={getCommunities} communities={communities} setCommunities={setCommunities} />} /> {/* This should work */}
          <Route path="/comment" element={<Comment getIssues={getIssues} issues={issues} setIssues={setIssues}  />} /> {/* This should work */}
        </Routes>
      </main>
    </div>
  );
}

export default App;