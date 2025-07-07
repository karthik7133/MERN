// src/api/client.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://mern-project-au3d.onrender.com/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default apiClient;
