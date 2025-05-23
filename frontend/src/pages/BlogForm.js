import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
    Paper,
    Alert,
    Snackbar,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { createBlog, updateBlog, getBlog } from '../api';

const BlogForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category: '',
        image: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (id) {
            const fetchBlog = async () => {
                try {
                    const response = await getBlog(id);
                    setFormData(response.data);
                } catch (err) {
                    setError('Failed to fetch blog');
                }
            };
            fetchBlog();
        }
    }, [id]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (id) {
                await updateBlog(id, formData);
                setSuccess(true);
                setTimeout(() => {
                    navigate(`/blog/${id}`);
                }, 2000);
            } else {
                const response = await createBlog(formData);
                setSuccess(true);
                setTimeout(() => {
                    navigate(`/blog/${response.data._id}`);
                }, 2000);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="md">
            <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom align="center">
                    {id ? 'Edit Blog' : 'Create New Blog'}
                </Typography>

                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <TextField
                        fullWidth
                        label="Title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        margin="normal"
                        variant="outlined"
                    />

                    <TextField
                        fullWidth
                        label="Category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        margin="normal"
                        variant="outlined"
                    />

                    <TextField
                        fullWidth
                        label="Image URL"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        margin="normal"
                        variant="outlined"
                        helperText="Optional: Enter an image URL for your blog"
                    />

                    <TextField
                        fullWidth
                        label="Content"
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        required
                        margin="normal"
                        variant="outlined"
                        multiline
                        rows={6}
                    />

                    {error && (
                        <Alert severity="error" sx={{ mt: 2 }}>
                            {error}
                        </Alert>
                    )}

                    <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'center' }}>
                        <Button
                            variant="outlined"
                            onClick={() => navigate(-1)}
                            disabled={loading}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={loading}
                        >
                            {loading ? 'Saving...' : id ? 'Update Blog' : 'Create Blog'}
                        </Button>
                    </Box>
                </Box>
            </Paper>

            <Snackbar
                open={success}
                autoHideDuration={2000}
                onClose={() => setSuccess(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert severity="success" sx={{ width: '100%' }}>
                    {id ? 'Blog updated successfully!' : 'Blog created successfully!'}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default BlogForm; 