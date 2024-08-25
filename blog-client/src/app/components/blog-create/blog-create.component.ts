import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BlogService, BlogPost } from '../../services/blog.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs'; // Import 'of' to create an Observable

@Component({
             selector: 'app-blog-create',
             standalone: true,
             imports: [CommonModule, FormsModule, RouterModule],  // Removed HttpClientModule here
             templateUrl: './blog-create.component.html',
             styleUrls: ['./blog-create.component.css']
           })
export class BlogCreateComponent {
  post: BlogPost = { title: '', content: '', author: '' };
  errorMessage: string = '';  // Property to hold error message

  constructor(private blogService: BlogService, private router: Router) { }

  createPost(): void {
    this.blogService.createPost(this.post).pipe(
      catchError((error) => {
        this.errorMessage = 'Failed to create the blog post. Please try again.';
        console.error('Error creating post:', error);
        return of(null);  // Return a null observable to continue the flow
      })
    ).subscribe(response => {
      if (response) {
        this.router.navigate(['/']);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
