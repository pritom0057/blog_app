import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BlogService, BlogPost } from './blog.service';
import { environment } from '../../environments/environment';  // Adjust the path based on your project structure

describe('BlogService', () => {
  let service: BlogService;
  let httpMock: HttpTestingController;
  const apiUrl = environment.apiUrl; // Using environment configuration

  beforeEach(() => {
    TestBed.configureTestingModule({
                                     imports: [HttpClientTestingModule],
                                     providers: [BlogService],
                                   });

    service = TestBed.inject(BlogService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifies that no requests are outstanding
  });

  it('should retrieve paginated blog posts', () => {
    const mockPosts: BlogPost[] = [
      { id: 1, title: 'Test Post 1', content: 'Content 1', author: 'Author 1' },
      { id: 2, title: 'Test Post 2', content: 'Content 2', author: 'Author 2' },
    ];

    service.getPosts(1, 10).subscribe((response) => {
      expect(response.posts.length).toBe(2);
      expect(response.posts).toEqual(mockPosts);
    });

    const req = httpMock.expectOne(`${apiUrl}?page=1&limit=10`);
    expect(req.request.method).toBe('GET');
    req.flush({ posts: mockPosts, totalItems: 2, currentPage: 1, totalPages: 1 });
  });

  it('should retrieve a single blog post by ID', () => {
    const mockPost: BlogPost = { id: 1, title: 'Test Post 1', content: 'Content 1', author: 'Author 1' };

    service.getPost(1).subscribe((post) => {
      expect(post).toEqual(mockPost);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPost);
  });

  it('should create a new blog post', () => {
    const newPost: BlogPost = { title: 'New Post', content: 'New Content', author: 'New Author' };

    service.createPost(newPost).subscribe((post) => {
      expect(post).toEqual({ ...newPost, id: 1 });
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    req.flush({ ...newPost, id: 1 });
  });

  it('should update an existing blog post', () => {
    const updatedPost: BlogPost = { id: 1, title: 'Updated Post', content: 'Updated Content', author: 'Updated Author' };

    service.updatePost(1, updatedPost).subscribe((post) => {
      expect(post).toEqual(updatedPost);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedPost);
  });

  it('should delete a blog post', () => {
    service.deletePost(1).subscribe((response) => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
