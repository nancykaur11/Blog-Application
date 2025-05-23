import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Snackbar, Alert } from '@mui/material';
import BlogForm from '../components/BlogForm';
import { createBlog } from '../utils/api';

const CreateBlog = () => {
    const navigate = useNavigate();
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (formData) => {
        try {
            await createBlog(formData);
            setSuccess(true);
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (err) {
            console.error('Failed to create blog:', err);
        }
    };

    return (
        <>
            <BlogForm onSubmit={handleSubmit} />
            <Snackbar
                open={success}
                autoHideDuration={2000}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert severity="success" sx={{ width: '100%' }}>
                    Blog created successfully!
                </Alert>
            </Snackbar>
        </>
    );
};

export default CreateBlog;