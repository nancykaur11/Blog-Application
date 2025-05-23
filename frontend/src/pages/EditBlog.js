import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Snackbar, Alert } from '@mui/material';
import BlogForm from '../components/BlogForm';
import { getBlogs, updateBlog } from '../utils/api';

const EditBlog = () => {
    const [blog, setBlog] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await getBlogs();
                const blogData = response.data.find((b) => b._id === id);
                if (blogData) {
                    setBlog(blogData);
                } else {
                    setError('Blog not found');
                }
            } catch (err) {
                setError('Failed to fetch blog');
            }
        };

        fetchBlog();
    }, [id]);

    const handleSubmit = async (formData) => {
        try {
            await updateBlog(id, formData);
            setSuccess(true);
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (err) {
            setError('Failed to update blog');
        }
    };

    if (error) {
        return (
            <Container>
                <Box sx={{ mt: 4 }}>
                    <Typography color="error">{error}</Typography>
                </Box>
            </Container>
        );
    }

    return (
        <>
            {blog ? <BlogForm initialData={blog} onSubmit={handleSubmit} /> : null}
            <Snackbar
                open={success}
                autoHideDuration={2000}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert severity="success" sx={{ width: '100%' }}>
                    Blog updated successfully!
                </Alert>
            </Snackbar>
        </>
    );
};

export default EditBlog;