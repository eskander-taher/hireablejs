import axios from "axios";

export const BASE_URL = import.meta.env.DEV ? "http://localhost:5000/api" : "https://hireablejs-server.vercel.app/api";

// Create an instance of axios
const axiosInstance = axios.create({
	baseURL: BASE_URL, 
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
	(config) => {
		// Get the token from local storage
		const token = localStorage.getItem("token");

		// If the token exists, add it to the Authorization header
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		return config;
	},
	(error) => {
		// Handle request error
		return Promise.reject(error);
	}
);

// Add a response interceptor (optional)
axiosInstance.interceptors.response.use(
	(response) => {
		// Handle response
		return response;
	},
	(error) => {
		// Handle response error
		return Promise.reject(error);
	}
);

export default axiosInstance;
