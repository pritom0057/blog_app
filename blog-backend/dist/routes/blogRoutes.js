"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const BlogPost_1 = __importDefault(require("../models/BlogPost"));
const router = (0, express_1.Router)();
// Create a new blog post
router.post('/posts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content, author } = req.body;
    try {
        const newPost = yield BlogPost_1.default.create({ title, content, author });
        res.status(201).json(newPost);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create blog post' });
    }
}));
router.get('/posts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page if not provided
    const offset = (page - 1) * limit; // Calculate offset
    try {
        const { rows, count } = yield BlogPost_1.default.findAndCountAll({
            offset: offset,
            limit: limit,
        });
        res.json({
            posts: rows,
            totalItems: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to retrieve blog posts' });
    }
}));
// Get a single blog post by ID
router.get('/posts/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const post = yield BlogPost_1.default.findByPk(id);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json(post);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to retrieve blog post' });
    }
}));
// Update a blog post
router.put('/posts/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, content, author } = req.body;
    try {
        const post = yield BlogPost_1.default.findByPk(id);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        yield post.update({ title, content, author });
        res.json(post);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update blog post' });
    }
}));
// Delete a blog post
router.delete('/posts/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const post = yield BlogPost_1.default.findByPk(id);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        yield post.destroy();
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete blog post' });
    }
}));
exports.default = router;
