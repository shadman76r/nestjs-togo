import axios from "axios";

const API_URL = "http://localhost:3001"; // ✅ Your NestJS backend URL

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
