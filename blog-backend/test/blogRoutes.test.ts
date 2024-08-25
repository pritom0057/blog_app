import request from 'supertest';
import app from '../src/index';  // Import the Express app from your app file

describe('Blog API Endpoints with Pagination', () => {
    let createdPostId: number; // To store the ID of the post created for testing

    it('should create a new blog post', async () => {
        const response = await request(app)
            .post('/api/posts')
            .send({
                      title: 'Test Blog Post',
                      content: 'This is a test blog post content',
                      author: 'Test Author',
                  });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.title).toBe('Test Blog Post');
        expect(response.body.content).toBe('This is a test blog post content');
        expect(response.body.author).toBe('Test Author');

        createdPostId = response.body.id; // Store the created post ID for further tests
    });

    it('should retrieve paginated blog posts', async () => {
        const page = 1;
        const limit = 10;

        const response = await request(app)
            .get(`/api/posts?page=${page}&limit=${limit}`);

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body.posts)).toBeTruthy(); // Assuming the response contains a 'posts' array
        expect(response.body.posts.length).toBeLessThanOrEqual(limit); // Check if the posts array is within the limit
        expect(response.body).toHaveProperty('currentPage', page); // Check if the response includes the current page number
        expect(response.body).toHaveProperty('totalPages'); // Check if the response includes the total number of pages
    });

    it('should retrieve a single blog post by ID', async () => {
        const response = await request(app).get(`/api/posts/${createdPostId}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', createdPostId);
        expect(response.body).toHaveProperty('title', 'Test Blog Post');
    });

    it('should update a blog post', async () => {
        const response = await request(app)
            .put(`/api/posts/${createdPostId}`)
            .send({
                      title: 'Updated Blog Post',
                      content: 'Updated content for the blog post',
                      author: 'Updated Author',
                  });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', createdPostId);
        expect(response.body.title).toBe('Updated Blog Post');
        expect(response.body.content).toBe('Updated content for the blog post');
        expect(response.body.author).toBe('Updated Author');
    });

    it('should delete a blog post', async () => {
        const response = await request(app).delete(`/api/posts/${createdPostId}`);

        expect(response.status).toBe(204);
    });

    it('should return 404 for a non-existing blog post after deletion', async () => {
        const response = await request(app).get(`/api/posts/${createdPostId}`);

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error', 'Post not found');
    });
});
