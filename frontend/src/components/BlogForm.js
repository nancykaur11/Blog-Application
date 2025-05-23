import React, { useState, useEffect } from 'react';
import { Container, Paper, TextField, Button, Typography, Box, MenuItem } from '@mui/material';

const categories = ['Career', 'Finance', 'Travel', 'Technology', 'Lifestyle', 'Other'];

const BlogForm = ({ initialData, onSubmit }) => {
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        content: '',
        image: ''
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <Container maxWidth="md">
            <Box sx={{ mt: 4 }}>
                <Paper elevation={3} sx={{ p: 4 }}>
                    <Typography variant="h4" align="center" gutterBottom>
                        {initialData ? 'Edit Blog' : 'Create Blog'}
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label="Title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            margin="normal"
                            required
                        />
                        <TextField
                            fullWidth
                            select
                            label="Category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            margin="normal"
                            required
                        >
                            {categories.map((category) => (
                                <MenuItem key={category} value={category}>
                                    {category}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            fullWidth
                            label="Content"
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            margin="normal"
                            required
                            multiline
                            rows={6}
                        />
                        <TextField
                            fullWidth
                            label="Image URL (optional)"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            margin="normal"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ mt: 3 }}
                        >
                            {initialData ? 'Update Blog' : 'Create Blog'}
                        </Button>
                    </form>
                </Paper>
            </Box>
        </Container>
    );
};

export default BlogForm; 