import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
});
export default axiosInstance;

axiosInstance.interceptors.response.use( //oluşan hataları yakalayabilmek için
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);