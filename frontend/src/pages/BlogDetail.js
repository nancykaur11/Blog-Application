import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Container,
    Paper,
    Typography,
    Box,
    Chip,
    IconButton,
    Tooltip,
    Divider,
    CircularProgress,
    Alert,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { getBlogs, deleteBlog,getDetailBlogs} from '../utils/api';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BlogDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const fetchBlog = async () => {
        try {
            const response = await getDetailBlogs(id);
            if (Array.isArray(response.data) && response.data.length > 0) {
                setBlog(response.data[0]);
            } else {
                setError('Blog post not found');
            }
        } catch (err) {
            setError('Failed to fetch blog post');
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchBlog();
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this blog post?')) {
            try {
                await deleteBlog(id);
                navigate('/');
            } catch (err) {
                setError('Failed to delete blog post');
            }
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Container maxWidth="md">
                <Alert severity="error" sx={{ mt: 4 }}>
                    {error}
                </Alert>
            </Container>
        );
    }

    if (!blog) {
        return (
            <Container maxWidth="md">
                <Alert severity="info" sx={{ mt: 4 }}>
                    Blog post not found
                </Alert>
            </Container>
        );
    }

    return (
        <Container maxWidth="md">
            <Box sx={{ mt: 4, mb: 2 }}>
                <IconButton onClick={() => navigate(-1)} color="primary">
                    <ArrowBackIcon />
                </IconButton>
            </Box>

            <Paper elevation={3} sx={{ p: 4 }}>
                {blog.image && (
                    <Box sx={{ mb: 4, textAlign: 'center' }}>
                        <img
                            src={blog.image}
                            alt={blog.title}
                            style={{
                                maxWidth: '100%',
                                maxHeight: '400px',
                                objectFit: 'cover',
                                borderRadius: '8px',
                            }}
                        />
                    </Box>
                )}

                <Box sx={{ mb: 3 }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        {blog.title}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                        <Chip
                            label={blog.category}
                            color="primary"
                            variant="outlined"
                        />
                        <Typography variant="subtitle1" color="text.secondary">
                            By {blog.author}
                        </Typography>
                        <Typography variant="subtitle2" color="text.secondary">
                            {new Date(blog.createdAt).toLocaleDateString()}
                        </Typography>
                    </Box>
                </Box>

                <Divider sx={{ my: 3 }} />

                <Typography
                    variant="body1"
                    component="div"
                    sx={{
                        whiteSpace: 'pre-wrap',
                        lineHeight: 1.8,
                        '& p': { mb: 2 },
                    }}
                >
                    {blog.content}
                </Typography>

            
            </Paper>
        </Container>
    );
};

export default BlogDetail; 