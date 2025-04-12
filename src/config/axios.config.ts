import axios from "axios";
import Cookies from "universal-cookie";

const axiosInstance = axios.create({
	baseURL: "https://product-strapi-api-production.up.railway.app",
	// timeout: 2000,
});

axiosInstance.interceptors.request.use((config) => {
	const token = new Cookies().get("token");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
}, (error) => {
	// Handle request error
	return Promise.reject(error);
});

export default axiosInstance;
