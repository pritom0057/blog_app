import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BlogService, BlogPost } from '../../services/blog.service';
import { CommonModule } from "@angular/common";
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
             selector: 'app-blog-view',
             standalone: true,
             imports: [CommonModule, RouterModule],
             templateUrl: './blog-view.component.html',
             styleUrls: ['./blog-view.component.css']
           })
export class BlogViewComponent implements OnInit {
  post: BlogPost | null = null;
  errorMessage: string = '';  // Property to hold error message

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.blogService.getPost(id).pipe(
      catchError((error) => {
        this.errorMessage = 'Failed to load the blog post. Please try again later.';
        console.error('Error fetching post:', error);
        return of(null);  // Return a null observable if an error occurs
      })
    ).subscribe(post => this.post = post);
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
