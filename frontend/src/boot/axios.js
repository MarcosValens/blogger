import Vue from 'vue';
import axios from 'axios';

export default async ({ Vue, router }) => {


    // Add a request interceptor
    axios.interceptors.request.use(function (config) {
        if (config.url.includes("login") || config.url.includes("esliceu")) return config;
        config.withCredentials = true;
        config.headers['Authorization'] = `Bearer ${localStorage.getItem("token")}`
        return config;
    }, function (error) {
        return Promise.reject(error);
    });

    // Add a response interceptor
    axios.interceptors.response.use(function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        return response;
    }, function (error) {
        return Promise.reject(error);
    });
}

Vue.prototype.$axios = axios;
