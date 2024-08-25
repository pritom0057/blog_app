import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BlogService, BlogPost } from '../../services/blog.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
             selector: 'app-blog-edit',
             standalone: true,
             imports: [CommonModule, FormsModule, RouterModule],
             templateUrl: './blog-edit.component.html',
             styleUrls: ['./blog-edit.component.css']
           })
export class BlogEditComponent implements OnInit {
  post: BlogPost = { title: '', content: '', author: '' };
  errorMessage: string = ''; // Property to hold error message

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.blogService.getPost(id).pipe(
      catchError((error) => {
        this.errorMessage = 'Failed to load the blog post. Please try again.';
        console.error('Error loading post:', error);
        return of(null);
      })
    ).subscribe(post => {
      if (post) {
        this.post = post; // Load post data for editing
      }
    });
  }

  updatePost(): void {
    if (this.post.id) {
      this.blogService.updatePost(this.post.id, this.post).pipe(
        catchError((error) => {
          this.errorMessage = 'Failed to update the blog post. Please try again.';
          console.error('Error updating post:', error);
          return of(null);
        })
      ).subscribe(response => {
        if (response) {
          this.router.navigate(['/']);  // Navigate back to the blog list after updating
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
