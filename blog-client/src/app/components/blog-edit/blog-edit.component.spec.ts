import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BlogEditComponent } from './blog-edit.component';
import { BlogService } from '../../services/blog.service';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';

describe('BlogEditComponent', () => {
  let component: BlogEditComponent;
  let fixture: ComponentFixture<BlogEditComponent>;
  let blogService: BlogService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
                                           imports: [BlogEditComponent, RouterTestingModule, FormsModule],
                                           providers: [
                                             {
                                               provide: BlogService,
                                               useValue: {
                                                 getPost: jasmine.createSpy('getPost').and.returnValue(of({
                                                                                                            id: 1,
                                                                                                            title: 'Test Title',
                                                                                                            content: 'Test Content',
                                                                                                            author: 'Test Author'
                                                                                                          })),
                                                 updatePost: jasmine.createSpy('updatePost').and.returnValue(of({})),
                                               },
                                             },
                                             {
                                               provide: ActivatedRoute,
                                               useValue: {
                                                 snapshot: { paramMap: { get: (key: string) => '1' } }  // Mock route parameter to return ID '1'
                                               }
                                             }
                                           ],
                                         }).compileComponents();

    fixture = TestBed.createComponent(BlogEditComponent);
    component = fixture.componentInstance;
    blogService = TestBed.inject(BlogService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load the blog post on initialization', () => {
    expect(blogService.getPost).toHaveBeenCalledWith(1);  // Ensure getPost is called with ID 1
    expect(component.post.title).toBe('Test Title');
    expect(component.post.content).toBe('Test Content');
    expect(component.post.author).toBe('Test Author');
  });

  it('should update the blog post and navigate to the home page', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.post = { id: 1, title: 'Updated Title', content: 'Updated Content', author: 'Updated Author' };

    component.updatePost();

    expect(blogService.updatePost).toHaveBeenCalledWith(1, component.post);  // Check if updatePost is called with correct parameters
    expect(navigateSpy).toHaveBeenCalledWith(['/']);  // Check if navigation to home occurs after updating
  });

  it('should navigate back to the home page on goBack', () => {
    const navigateSpy = spyOn(router, 'navigate');

    component.goBack();

    expect(navigateSpy).toHaveBeenCalledWith(['/']);  // Check if goBack navigates to home
  });
});
