import axios from 'axios';
// const baseURL = process.env.REACT_APP_HOST_IP_ADDRESS + ':8000/';

const baseURL = 'http://localhost:8000';


const axiosInstance = axios.create({
	baseURL: baseURL,
	headers: {
		'Content-Type': 'application/json',
		accept: 'application/json',
	}, 
});

export default axiosInstance;