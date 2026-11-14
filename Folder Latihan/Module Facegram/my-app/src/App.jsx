import { BrowserRouter as Router, Routes, Route, useParams, Link } from 'react-router-dom';

import Beranda from './components/beranda';
import Profile from './components/profile';
import Login from './components/login';
import Register from './components/register';
import { useState } from 'react';


export default function App() {
  const [username, setUserName] = useState('');

  function ProfileWrapper() {
    let { username } = useParams();
    setUserName(username)
    return <Profile username={username} />;
  }

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
        <span className="navbar-brand fw-bold">Facegram</span>
        <div className="ms-auto d-flex gap-3">
          <Link to="/" className="text-white text-decoration-none">Beranda</Link>
          <Link to={`/profile/${username}`} className="text-white text-decoration-none">Profil</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Beranda />} />
        <Route path="/profile/:username" element={<ProfileWrapper />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}