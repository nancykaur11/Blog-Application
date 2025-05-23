import axios from 'axios';

const API_URL = 'https://blog-application-tpl3.onrender.com/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const login = (email, password) => {
    return api.post('/auth/login', { email, password });
};

export const signup = (name, email, password) => {
    return api.post('/auth/signup', { name, email, password });
};

export const getBlogs = (category, author) => {
    const params = {};
    if (category) params.category = category;
    if (author) params.author = author;
    return api.get('/blogs', { params });
};

export const getDetailBlogs = (id) => {
    const params = {};
    if (id) params.id = id;
    return api.get('/blogs', { params });
};

export const createBlog = (blogData) => {
    return api.post('/blogs', blogData);
};

export const updateBlog = (id, blogData) => {
    return api.put(`/blogs/${id}`, blogData);
};

export const deleteBlog = (id) => {
    return api.delete(`/blogs/${id}`);
};