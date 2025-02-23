import { Routes, Route, Navigate } from "react-router-dom";
import { Box, Spinner, Center } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";

import Navbar from "./components/Navbar";
import Chat from "./pages/Chat";
import Announcements from "./pages/Announcements";
import Resources from "./pages/Resources";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import { AuthProvider, useAuth } from "./store/authContextProvider";
import { SocketProvider } from "./store/socketContextProvider";

function AppContent() {
  const { authUser, isCheckingAuth } = useAuth();
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  useEffect(() => {
    if (!authUser) {
      setLoadingUsers(false); // Stop loading if no authenticated user
      return;
    }

    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/users", {
          withCredentials: true, 
        });
    
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchUsers();
  }, [authUser]);

  if (isCheckingAuth || loadingUsers) {
    return (
      <Center h="100vh">
        <Spinner size="xl" color="teal.500" />
      </Center>
    );
  }

  return (
    <Box>
      {<Navbar />}
      <Box p={4}>
        <Routes>
          <Route path="/" element={authUser ? <Chat users={users} /> : <Navigate to="/login" />} />
          <Route path="/announcements" element={authUser ? <Announcements /> : <Navigate to="/login" />} />
          <Route path="/resources" element={authUser ? <Resources /> : <Navigate to="/login" />} />
          <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/" />} />
          <Route path="/signup" element={!authUser ? <SignUp /> : <Navigate to="/" />} />
          <Route path="/dashboard" element={authUser ? <Dashboard /> : <Navigate to="/login" />} />
        </Routes>
      </Box>
    </Box>
  );
}

function App() {
  return (
    <AuthProvider>
      <SocketProvider>
        <AppContent />
      </SocketProvider>
    </AuthProvider>
  );
}

export default App;
