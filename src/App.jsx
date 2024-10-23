import './App.css'

import { Route, Routes, useParams } from 'react-router-dom'

import { BrowserRouter } from 'react-router-dom'

import Home from './components/Home'
import Form from './components/Form' // Correct import
import axios from 'axios'
import { useState, useEffect } from 'react'
// import { get } from 'mongoose';
import Comment from './components/Comment'
import Nav from './components/Nav'
import SideBar from './components/SideBar'
import SignIn from './pages/SignIn'
import Register from './pages/Register'
import Details from './components/Details'

import Update from './components/Update'
import { CheckSession } from './services/Auth'

import UserProfile from './components/UserProfile'
import RightSideBar from './components/RightSideBar'

function App() {
  const [issues, setIssues] = useState([])
  const [communities, setCommunities] = useState([])
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [searchTerm, setSearchTerm] = useState('') // Manage search term state

  const [user, setUser] = useState(null)
  const handleLogout = () => {
    //Reset all auth related state and clear localStorage
    setUser(null)
    localStorage.clear()
  }

  const getIssues = async () => {
    try {
      let res = await axios.get('http://localhost:3001/issue')
      console.log('Fetched comments:', res.data)
      console.log(res.data)
      setIssues(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const getCommunities = async () => {
    try {
      let res = await axios.get('http://localhost:3001/community')
      console.log('Fetched community:', res.data) // Check the fetched data
      setCommunities(res.data)
    } catch (err) {
      console.error('Error fetching communities:', err)
    }
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen) // Toggle sidebar open/close state
  }

  const checkToken = async () => {
    //If a token exists, sends token to localStorage to persist logged in user
    const user = await CheckSession()
    console.log(user)
    setUser(user.data)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      checkToken()
    }
    // getIssues()
    getCommunities()
  }, [])

  return (
    <div className="App">
      <Nav
        user={user}
        handleLogout={handleLogout}
        toggleSidebar={toggleSidebar}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <SideBar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        communities={communities}
      />
      <RightSideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <main className={isSidebarOpen ? 'shifted' : ''}>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                getIssues={getIssues}
                issues={issues}
                setIssues={setIssues}
                getCommunities={getCommunities}
                communities={communities}
                setCommunities={setCommunities}
                searchTerm={searchTerm}
                user={user}
              />
            }
          />
          <Route
            path="/comment/:sectionId"
            element={
              <Comment
                getIssues={getIssues}
                issues={issues}
                setIssues={setIssues}
              />
            }
          />
          <Route
            path="/form"
            element={
              <Form
                getCommunities={getCommunities}
                communities={communities}
                setCommunities={setCommunities}
                user={user}
              />
            }
          />{' '}
          {/* This should work */}
          <Route
            path="/comment"
            element={
              <Comment
                getIssues={getIssues}
                issues={issues}
                setIssues={setIssues}
              />
            }
          />{' '}
          <Route path="/user/:id" element={<UserProfile />} />
          <Route
            path="/signIn"
            element={<SignIn user={user} setUser={setUser} />}
          />
          <Route
            path="/register"
            element={<Register user={user} setUser={setUser} />}
          />
          <Route
            path="/listings/:id"
            element={<Details communities={communities} user={user} />}
          />
          <Route
            path="community/update/:id"
            element={<Update communities={communities} user={user} />}
          />
        </Routes>
      </main>
    </div>
  )
}

export default App
