import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000'; // Adjust as needed

// Login
export const login = async (credentials) => {
  const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
  return response.data;
};

// Register
export const register = async (userData) => {
  const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
  return response.data;
};

// Create Complaint
export const createComplaint = async (complaintData, token) => {
  const response = await axios.post(`${API_BASE_URL}/complaints`, complaintData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Get Complaints
export const getComplaints = async (token) => {
  const response = await axios.get(`${API_BASE_URL}/complaints`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Get Complaint by ID
export const getComplaintById = async (id, token) => {
  const response = await axios.get(`${API_BASE_URL}/complaints/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Update Complaint
export const updateComplaint = async (id, updatedData, token) => {
  const response = await axios.put(`${API_BASE_URL}/complaints/${id}`, updatedData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Delete Complaint
export const deleteComplaint = async (id, token) => {
  const response = await axios.delete(`${API_BASE_URL}/complaints/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
