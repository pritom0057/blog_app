import { Router, Request, Response } from 'express';
import BlogPost from '../models/BlogPost';

const router = Router();

// Create a new blog post
router.post('/posts', async (req: Request, res: Response) => {
    const { title, content, author } = req.body;

    try {
        const newPost = await BlogPost.create({ title, content, author });
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create blog post' });
    }
});

router.get('/posts', async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;  // Default to page 1 if not provided
    const limit = parseInt(req.query.limit as string) || 10;  // Default to 10 items per page if not provided
    const offset = (page - 1) * limit;  // Calculate offset

    try {
        const { rows, count } = await BlogPost.findAndCountAll({
                                                                   offset: offset,
                                                                   limit: limit,
                                                               });

        res.json({
                     posts: rows,
                     totalItems: count,
                     totalPages: Math.ceil(count / limit),
                     currentPage: page
                 });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve blog posts' });
    }
});

// Get a single blog post by ID
router.get('/posts/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const post = await BlogPost.findByPk(id);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        res.json(post);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve blog post' });
    }
});

// Update a blog post
router.put('/posts/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, content, author } = req.body;

    try {
        const post = await BlogPost.findByPk(id);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        await post.update({ title, content, author });
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update blog post' });
    }
});

// Delete a blog post
router.delete('/posts/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const post = await BlogPost.findByPk(id);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        await post.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete blog post' });
    }
});

export default router;
