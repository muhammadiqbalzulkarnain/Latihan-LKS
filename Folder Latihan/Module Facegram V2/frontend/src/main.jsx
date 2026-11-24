import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './bootstrap.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login.jsx';
import Register from './pages/Register.jsx';
import Homepage from './pages/homepage.jsx';
import MyProfile from './pages/my-profile.jsx';
import CreateNewPost from './pages/create-new-post.jsx';
import UserProfile from './pages/user-profile.jsx';
import UserProfileFollowing from './pages/user-profile-following.jsx';
import UserProfilePrivate from './pages/user-profile-private.jsx';
import UserProfileRequested from './pages/user-profile-requested.jsx';
import NoAuth from './components/NoAuth.jsx';
import Auth from './components/Auth.jsx';
import Navbar from './components/navbar.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route element={<NoAuth />}>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<Auth />}>
          <Route element={<Navbar />} >
            <Route path="/homepage" element={<Homepage />} />
            <Route path="/my-profile/:username" element={<MyProfile />} />
            <Route path="/create-post" element={<CreateNewPost />} />
          </Route>
        </Route>

        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/user-profile-following" element={<UserProfileFollowing />} />
        <Route path="/user-profile-private" element={<UserProfilePrivate />} />
        <Route path="/user-profile-requested" element={<UserProfileRequested />} />
      </Routes>
    </Router>
  </StrictMode>,
)