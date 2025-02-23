
// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import Chat from './pages/Chat';
import Announcements from './pages/Announcements';
import Resources from './pages/Resources';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <>
      <Navbar />
      <Box p={4}>
        <Routes>
          <Route path="/" element={<Chat />} />
          <Route path="/announcements" element={<Announcements />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Box>

    </>
  );
}

export default App;

