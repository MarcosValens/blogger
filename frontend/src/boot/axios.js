import Vue from 'vue';
import axios from 'axios';

export default async ({ Vue, router }) => {
    axios.interceptors.request.use(function (config) {
        if (config.url.includes("login") || config.url.includes("esliceu")) return config;
        config.headers['Authorization'] = `Bearer ${localStorage.getItem("token")}`
        return config;
    }, function (error) {
        return Promise.reject(error);
    });

    axios.interceptors.response.use(function (response) {
        return response;
    }, function (error) {
        return Promise.reject(error);
    });
}

Vue.prototype.$axios = axios;
