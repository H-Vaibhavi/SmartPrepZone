// src/axiosConfig.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000', // Adjust if needed
  withCredentials: true,
});

export default instance; // ✅ Export your configured instance!
