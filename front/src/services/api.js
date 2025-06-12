import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000', // Substitua pela URL da sua API
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;