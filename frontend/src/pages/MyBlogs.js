import React, { useState, useEffect } from 'react';
import { Container, Typography, Box } from '@mui/material';
import BlogList from '../components/BlogList';
import { getBlogs, deleteBlog } from '../utils/api';
import { useAuth } from '../context/AuthContext';

const MyBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [error, setError] = useState('');
    const { user } = useAuth();

    const fetchMyBlogs = async () => {
        try {
            const response = await getBlogs();
            const myBlogs = response.data.filter((blog) => blog.userId === user.id);
            setBlogs(myBlogs);
        } catch (err) {
            setError('Failed to fetch blogs');
        }
    };

    useEffect(() => {
        fetchMyBlogs();
    }, [user]);

    const handleDelete = async (id) => {
        try {
            await deleteBlog(id);
            fetchMyBlogs();
        } catch (err) {
            setError('Failed to delete blog');
        }
    };

    return (
        <Container>
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" gutterBottom>
                    My Blogs
                </Typography>
                {error && (
                    <Typography color="error" gutterBottom>
                        {error}
                    </Typography>
                )}
                <BlogList blogs={blogs} onDelete={handleDelete} />
            </Box>
        </Container>
    );
};

export default MyBlogs; 