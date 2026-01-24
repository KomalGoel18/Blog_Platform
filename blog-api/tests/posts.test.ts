import request from 'supertest';
import app from '../src/app';

describe('Blog Posts API', () => {
  it('GET /api/posts should return 200', async () => {
    const res = await request(app).get('/api/posts');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.posts)).toBe(true);
  });

  it('POST /api/posts should create a post', async () => {
    const res = await request(app)
      .post('/api/posts')
      .send({
        title: 'Test Post',
        content: 'Test Content',
        author: 'Tester'
      });

    expect(res.status).toBe(201);
    expect(res.body.title).toBe('Test Post');
  });
});
