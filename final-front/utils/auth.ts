import axios from "axios";

export const API_URL = "http://localhost:3001"; // ✅ Set correct API base URL

export const loginUser = async (email: string, password: string) => {
    const response = await axios.post(`${API_URL}/user/login`, { email, password });
    return response.data;
};

export const signupUser = async (username: string, email: string, password: string) => {
    const response = await axios.post(`${API_URL}/user/signup`, { username, email, password });
    return response.data;
};

export const resetPassword = async (email: string, newPassword: string) => {
    const response = await axios.post(`${API_URL}/user/reset-password`, { email, newPassword });
    return response.data;
};
