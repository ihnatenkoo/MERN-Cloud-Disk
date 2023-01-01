import axios from 'axios';

const $api = axios.create({
	withCredentials: false,
	baseURL: import.meta.env.VITE_URL,
});

$api.interceptors.request.use((config) => {
	if (config.headers) {
		config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
	}
	return config;
});

export default $api;
