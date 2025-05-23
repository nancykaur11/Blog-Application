import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, TextField, MenuItem } from '@mui/material';
import BlogList from '../components/BlogList';
import { getBlogs, deleteBlog } from '../utils/api';

const categories = ['All', 'Career', 'Finance', 'Travel', 'Technology', 'Lifestyle', 'Other'];

const Home = () => {
    const [blogs, setBlogs] = useState([]);
    const [category, setCategory] = useState('All');
    const [author, setAuthor] = useState('');
    const [error, setError] = useState('');

    const fetchBlogs = async () => {
        try {
            const response = await getBlogs(
                category === 'All' ? '' : category,
                author
            );
            setBlogs(response.data);
        } catch (err) {
            setError('Failed to fetch blogs');
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, [category, author]);

    const handleDelete = async (id) => {
        try {
            await deleteBlog(id);
            fetchBlogs();
        } catch (err) {
            setError('Failed to delete blog');
        }
    };

    return (
        <Container>
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" gutterBottom>
                    All Blogs
                </Typography>
                <Box sx={{ 
                    mb: 4, 
                    display: 'flex', 
                    gap: 2,
                    flexDirection: { xs: 'column', sm: 'row' },
                    '& .MuiTextField-root': {
                        width: { xs: '100%', sm: 'auto' }
                    }
                }}>
                    <TextField
                        select
                        label="Category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        sx={{ minWidth: { xs: '100%', sm: 200 } }}
                    >
                        {categories.map((cat) => (
                            <MenuItem key={cat} value={cat}>
                                {cat}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        label="Author"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        sx={{ minWidth: { xs: '100%', sm: 200 } }}
                    />
                </Box>
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

export default Home; 