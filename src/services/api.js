import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api"; // ✅ Ensure this matches your backend

// Fetch Transactions
export const fetchTransactions = async (month, search = "", page = 1, perPage = 10) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/transactions`, {
            params: { month, search, page, perPage }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching transactions:", error);
        return [];
    }
};

// Fetch Statistics
export const fetchStatistics = async (month) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/statistics`, { params: { month } });
        return response.data;
    } catch (error) {
        console.error("Error fetching statistics:", error);
        return null;
    }
};

// Fetch Bar Chart Data
export const fetchBarChart = async (month) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/bar-chart`, { params: { month } });
        return response.data;
    } catch (error) {
        console.error("Error fetching bar chart data:", error);
        return [];
    }
};

// Fetch Pie Chart Data
export const fetchPieChart = async (month) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/pie-chart`, { params: { month } });
        return response.data;
    } catch (error) {
        console.error("Error fetching pie chart data:", error);
        return [];
    }
};
