import axios from "axios";

const API_URL = "http://localhost:3001/user"; // ✅ Ensure your backend is running on this port

export const loginUser = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};

export const signupUser = async (username: string, email: string, password: string) => {
  const response = await axios.post(`${API_URL}/signup`, { username, email, password });
  return response.data;
};

export const resetPassword = async (email: string, newPassword: string) => {
  const response = await axios.post(`${API_URL}/reset-password`, { email, newPassword });
  return response.data;
};
