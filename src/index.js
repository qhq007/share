import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import axios from "axios"
import { BrowserRouter } from 'react-router-dom';
import './index.css';

axios.defaults.baseURL="http://localhost:8080/";
axios.interceptors.request.use((config) => {
    if(localStorage.getItem("token")){
        config.headers.Authorization = "Bearer " + localStorage.getItem("token");
    }
    return config;
})
axios.interceptors.response.use(response => {
    if(response.data.message === "身份认证失败")
        localStorage.clear();
    return response.data;
})
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>    
);
