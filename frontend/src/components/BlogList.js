import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
  Chip,
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import ArticleIcon from '@mui/icons-material/Article';

const BlogList = ({ blogs, onDelete }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [success, setSuccess] = useState(false);
  const [deletedBlogId, setDeletedBlogId] = useState(null);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        await onDelete(id);
        setDeletedBlogId(id);
        setSuccess(true);
      } catch (err) {
        console.error('Failed to delete blog:', err);
      }
    }
  };

  if (!blogs || blogs.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          py: 8,
          gap: 2,
        }}
      >
        <ArticleIcon sx={{ fontSize: 60, color: 'text.secondary', opacity: 0.5 }} />
        <Typography variant="h6" color="text.secondary" align="center">
          No blogs found
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          Try adjusting your search criteria or create a new blog post
        </Typography>
        {user && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/create')}
            sx={{ mt: 2 }}
          >
            Create New Blog
          </Button>
        )}
      </Box>
    );
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {blogs.map((blog) => (
          <Card
            key={blog._id}
            sx={{
              display: 'flex',
              width: '100%',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: (theme) => theme.shadows[8],
              },
            }}
          >
            {blog.image && (
              <CardMedia
                component="img"
                image={blog.image}
                alt={blog.title}
                sx={{
                  width: 240,
                  objectFit: 'cover',
                  borderRight: '1px solid',
                  borderColor: 'divider',
                }}
              />
            )}
            <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              <CardContent sx={{ flex: '1 0 auto', pb: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{
                      fontWeight: 600,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      maxWidth: '80%',
                    }}
                  >
                    {blog.title}
                  </Typography>
                  <Chip
                    label={blog.category}
                    size="small"
                    color="primary"
                    variant="outlined"
                    sx={{ ml: 1 }}
                  />
                </Box>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    mb: 2,
                    lineHeight: 1.5,
                  }}
                >
                  {blog.content}
                </Typography>

                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  borderTop: '1px solid',
                  borderColor: 'divider',
                  pt: 1
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      By {blog.author}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </Typography>
                  </Box>
                  <CardActions sx={{ p: 0, gap: 1 }}>
                    <Tooltip title="Read More">
                      <IconButton 
                        size="small" 
                        onClick={() => navigate(`/blog/${blog._id}`)}
                        color="primary"
                      >
                        <ReadMoreIcon />
                      </IconButton>
                    </Tooltip>
                    {user && user.id === blog.userId && (
                      <>
                        <Tooltip title="Edit">
                          <IconButton
                            size="small"
                            onClick={() => navigate(`/edit/${blog._id}`)}
                            color="primary"
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton
                            size="small"
                            onClick={() => handleDelete(blog._id)}
                            color="error"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </>
                    )}
                  </CardActions>
                </Box>
              </CardContent>
            </Box>
          </Card>
        ))}
      </Box>
      <Snackbar
        open={success}
        autoHideDuration={2000}
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Blog deleted successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default BlogList;