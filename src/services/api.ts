import axios from 'axios';

const URL = "https://reqres.in/api";

const api = axios.create({
    baseURL: URL,
});

export default api;