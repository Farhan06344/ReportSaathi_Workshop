import axios from 'axios';

// Use relative '/api' so Vite proxy forwards to http://127.0.0.1:8000/api seamlessly
const API_BASE_URL = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL.replace(/\/+$/, '')}/api`
  : '/api';

const client = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000,
});

export const checkHealth = async () => {
  try {
    const res = await client.get('/health');
    return res.data;
  } catch (err) {
    console.warn('API health check error:', err);
    return null;
  }
};

export const analyzeReportFile = async (file, userId = null) => {
  const formData = new FormData();
  formData.append('file', file);
  if (userId) {
    formData.append('user_id', userId);
  }

  const res = await client.post('/reports/analyze', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};

export const analyzeReportText = async (text, userId = null) => {
  const res = await client.post('/reports/analyze-text', {
    text,
    user_id: userId,
  });
  return res.data;
};

export const fetchHistory = async (userId = null) => {
  const params = userId ? { user_id: userId } : {};
  const res = await client.get('/history', { params });
  return res.data;
};
