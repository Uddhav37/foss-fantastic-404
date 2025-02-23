// src/services/api.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

export const signup = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signup`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Signup failed');
  }
};

export const fetchAnnouncements = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/announcements`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Failed to fetch announcements'
    );
  }
};

export const fetchResources = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/resources`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Failed to fetch resources'
    );
  }
};

export const fetchMessages = async (chatId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/chats/${chatId}/messages`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Failed to fetch messages'
    );
  }
};

export const sendMessage = async (chatId, message) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/chats/${chatId}/messages`, {
      message,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to send message');
  }
};
