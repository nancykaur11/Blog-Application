const router = require('express').Router();
const Blog = require('../models/Blog');
const User = require('../models/User');
const auth = require('../middleware/auth');


router.get('/', async (req, res) => {
    try {
        const { category, author } = req.query;
        let query = {};

        if (category) query.category = category;
        if (author) query.author = { $regex: author, $options: "i" };
        const blogs = await Blog.find(query).sort({ createdAt: -1 });
        res.json(blogs);
    } catch (err) {
        console.error('Error fetching blogs:', err);
        res.status(500).json({ 
            message: 'Failed to fetch blogs',
            error: err.message 
        });
    }
});


router.post('/', auth, async (req, res) => {
    try {
        const { title, category, content, image } = req.body;
        
        if (!title || !category || !content) {
            return res.status(400).json({ message: 'Title, category, and content are required' });
        }

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const blog = new Blog({
            title,
            category,
            content,
            image,
            author: user.name,
            userId: req.user.id
        });

        await blog.save();
        res.status(201).json(blog);
    } catch (err) {
        console.error('Error creating blog:', err);
        res.status(500).json({ 
            message: 'Failed to create blog',
            error: err.message 
        });
    }
});


router.put('/:id', auth, async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        if (blog.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        res.json(updatedBlog);
    } catch (err) {
        console.error('Error updating blog:', err);
        res.status(500).json({ 
            message: 'Failed to update blog',
            error: err.message 
        });
    }
});


router.delete('/:id', auth, async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        if (blog.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        await Blog.findByIdAndDelete(req.params.id);
        res.json({ message: 'Blog deleted successfully' });
    } catch (err) {
        console.error('Error deleting blog:', err);
        res.status(500).json({ 
            message: 'Failed to delete blog',
            error: err.message 
        });
    }
});

module.exports = router; 