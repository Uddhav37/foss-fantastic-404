import { Routes, Route, Navigate } from "react-router-dom";
import { Box, Spinner, Center } from "@chakra-ui/react";

import Navbar from "./components/Navbar";
import Chat from "./pages/Chat";
import Announcements from "./pages/Announcements";
import Resources from "./pages/Resources";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import { AuthProvider, useAuth } from "./store/authContextProvider";

function AppContent() {
  const { authUser, isCheckingAuth } = useAuth(); // No need to call `checkAuth()`

  // Show a loading spinner while checking authentication
  if (isCheckingAuth) {
    return (
      <Center h="100vh">
        <Spinner size="xl" color="teal.500" />
      </Center>
    );
  }

  return (
    <>
      <Navbar />
      <Box p={4}>
        <Routes>
          <Route path="/" element={authUser ? <Chat /> : <Navigate to="/login" />} />
          <Route path="/announcements" element={authUser ? <Announcements /> : <Navigate to="/login" />} />
          <Route path="/resources" element={authUser ? <Resources /> : <Navigate to="/login" />} />
          <Route path="/login" element={authUser ? <Navigate to="/" /> : <Login />} />
          <Route path="/signup" element={authUser ? <Navigate to="/" /> : <SignUp />} />
          <Route path="/dashboard" element={authUser ? <Dashboard /> : <Navigate to="/login" />} />
        </Routes>
      </Box>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
