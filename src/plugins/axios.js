import axios from 'axios';
import {useMessage} from "@/composibles/useMessage";

const { showMessage } = useMessage();

const apiClient = axios.create({
    baseURL: 'http://personal-web-application-project-management-system.test/api',
    withCredentials: false,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

apiClient.interceptors.request.use((config) => {
    const token = '13|xVVIcDrTktStaP2ZciUTDNMJQQqUorWTCO2iGmpNd08466f4'; // use this for now will be using with authentication next time;

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config
}, error => Promise.reject(error));

apiClient.interceptors.response.use((response) => {

    if (response?.data && Boolean(response.data.data)) {
        return response.data;
    }

    return response.data
}, error => {
    if (error?.response && Boolean(error.response.data)) {
        const response = error.response.data;
        showMessage(response.message, 'error');
    }
    return Promise.reject(error);
})

export default apiClient;
