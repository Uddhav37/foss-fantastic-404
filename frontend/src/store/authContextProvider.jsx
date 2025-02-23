import { createContext, useContext, useState, useEffect } from "react";
import { axiosInstance } from "../lib/axios";

// Create context
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Function to check authentication status
  const checkAuth = async () => {
    setIsCheckingAuth(true);
    try {
      const userData = localStorage.getItem("authUser"); // Retrieve from localStorage
      if (userData) {
        setAuthUser(JSON.parse(userData)); // Parse and set authUser
      } else {
        const res = await axiosInstance.get("auth/check");
        setAuthUser(res.data);
        localStorage.setItem("authUser", JSON.stringify(res.data)); // Store in localStorage
      }
    } catch (error) {
      console.error("Error in checkAuth:", error.message);
      setAuthUser(null);
      localStorage.removeItem("authUser"); // Clear storage on error
    } finally {
      setIsCheckingAuth(false);
    }
  };

  // Function to handle signup
  const signup = async (fullName, email, password) => {
    setIsSigningUp(true);
    try {
      const res = await axiosInstance.post("auth/signup", { fullName, email, password });
      setAuthUser(res.data);
      localStorage.setItem("authUser", JSON.stringify(res.data)); // Store user data
    } catch (error) {
      console.error("Signup failed:", error.message);
      throw error;
    } finally {
      setIsSigningUp(false);
    }
  };

  // Function to handle login
  const login = async (email, password) => {
    setIsLoggingIn(true);
    try {
      const res = await axiosInstance.post("auth/login", { email, password });
      setAuthUser(res.data);
      localStorage.setItem("authUser", JSON.stringify(res.data)); // Store user data
      return res.data;
    } catch (error) {
      console.error("Login failed:", error.message);
      throw error;
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Function to logout
  const logout = async () => {
    try {
      await axiosInstance.post("auth/logout");
      setAuthUser(null);
      localStorage.removeItem("authUser"); // Clear user data
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  // Fetch authentication status on mount
  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authUser,
        isCheckingAuth,
        isSigningUp,
        isLoggingIn,
        checkAuth,
        signup,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
