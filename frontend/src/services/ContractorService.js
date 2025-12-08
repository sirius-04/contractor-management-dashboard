import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/contractors";

// Get all contractors
export const getAllContractors = () => {
  return axios.get(API_BASE_URL);
};

// Get contractor by ID
export const getContractorById = id => {
  return axios.get(`${API_BASE_URL}/${id}`);
};

// Create new contractor
export const createContractor = contractor => {
  return axios.post(API_BASE_URL, contractor);
};

// Update contractor
export const updateContractor = (id, contractor) => {
  return axios.put(`${API_BASE_URL}/${id}`, contractor);
};

// Disable contractor
export const disableContractor = id => {
  return axios.put(`${API_BASE_URL}/${id}/disable`);
};

// Delete contractor
export const deleteContractor = id => {
  return axios.delete(`${API_BASE_URL}/${id}`);
};