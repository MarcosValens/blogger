import Vue from 'vue';
import axios from 'axios';

export default async ({ Vue, router }) => {


    // Add a request interceptor
    axios.interceptors.request.use(function (config) {
        if (config.url.includes("login") || config.url.includes("esliceu")) return config;
        console.log(config)
        axios.defaults.withCredentials = true;
        config.headers['Authorization'] = `Bearer ${localStorage.getItem("token")}`
        // Do something before request is sent
        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });

    // Add a response interceptor
    axios.interceptors.response.use(function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        console.log(response);
        return response;
    }, function (error) {
        return Promise.reject(error);
    });
}

Vue.prototype.$axios = axios;
