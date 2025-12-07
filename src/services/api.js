import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://truestate-assignment-backend-production.up.railway.app/api/transactions';

export const fetchTransactions = async (params) => {
  try {
    const response = await axios.get(API_URL, { params });
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const fetchFilterOptions = async () => {
  try {
    const response = await axios.get(`${API_URL}/options`);
    return response.data;
  } catch (error) {
    console.error("Options Error:", error);
    throw error;
  }
};

export const updateTransaction = async (id, data) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Update Error:", error);
    throw error;
  }
};

export const deleteTransaction = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Delete Error:", error);
    throw error;
  }
};

export const fetchStats = async () => {
  try {
    const response = await axios.get(`${API_URL}/stats`);
    return response.data;
  } catch (error) {
    console.error("Stats Error:", error);
    throw error;
  }
};
