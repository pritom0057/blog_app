import { Component, OnInit } from '@angular/core';
import { BlogService, BlogPost } from '../../services/blog.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
             selector: 'app-blog-list',
             standalone: true,
             imports: [CommonModule, RouterModule],
             templateUrl: './blog-list.component.html',
             styleUrls: ['./blog-list.component.css']
           })
export class BlogListComponent implements OnInit {
  posts: BlogPost[] = [];
  totalPages: number = 0;
  currentPage: number = 1;
  limit: number = 10;  // Number of items per page
  errorMessage: string = ''; // Property to hold error message

  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.blogService.getPosts(this.currentPage, this.limit).pipe(
      catchError((error) => {
        this.errorMessage = 'Failed to load blog posts. Please try again.';
        console.error('Error loading posts:', error);
        return of({ posts: [], totalPages: 0, currentPage: this.currentPage }); // Provide a fallback object
      })
    ).subscribe(response => {
      this.posts = response.posts;
      this.totalPages = response.totalPages;
      this.currentPage = response.currentPage;
    });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadPosts();
  }

  confirmDelete(id: number): void {
    if (confirm('Are you sure you want to delete this post?')) {
      this.deletePost(id);
    }
  }

  deletePost(id: number): void {
    this.blogService.deletePost(id).pipe(
      catchError((error) => {
        this.errorMessage = 'Failed to delete the blog post. Please try again.';
        console.error('Error deleting post:', error);
        return of(null); // Return a null observable to continue the flow
      })
    ).subscribe(response => {
      if (response !== null) {
        this.posts = this.posts.filter(post => post.id !== id);
        this.loadPosts();  // Reload posts after deletion
      }
    });
  }
}
