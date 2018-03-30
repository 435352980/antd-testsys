import axios from 'axios';
import { message } from 'antd';

const setAxiosInterceptors = onUnauthorized => {
	axios.interceptors.request.use(config => {
		let token = localStorage.getItem('auth-token');
		if (token) {
			config.headers['Authorization'] = `JWT ${token}`;
		}
		config.timeout = 10000;
		return config;
	});

	axios.interceptors.response.use(
		response => response,
		error => {
			if (error && error.response) {
				// The request was made and the server responded with a status code
				// that falls out of the range of 2xx
				const { data, status, headers } = error.response;
				if (status === 401) {
					localStorage.removeItem('auth-token');
					onUnauthorized();
				}
			}
			return Promise.reject(error);
		}
	);
};

export default setAxiosInterceptors;
