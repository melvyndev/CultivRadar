import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});

export const getWeather = (location) => api.get(`/weather?q=${location}&APPID=YOUR_API_KEY`);
