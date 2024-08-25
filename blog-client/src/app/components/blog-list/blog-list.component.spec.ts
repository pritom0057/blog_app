import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BlogListComponent } from './blog-list.component';
import { BlogService } from '../../services/blog.service';
import { of } from 'rxjs';

describe('BlogListComponent', () => {
  let component: BlogListComponent;
  let fixture: ComponentFixture<BlogListComponent>;
  let blogService: BlogService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
                                           imports: [BlogListComponent, RouterTestingModule],
                                           providers: [
                                             {
                                               provide: BlogService,
                                               useValue: {
                                                 getPosts: jasmine.createSpy('getPosts').and.returnValue(of({
                                                                                                              posts: [
                                                                                                                { id: 1, title: 'Test Title 1', content: 'Test Content 1', author: 'Test Author 1' },
                                                                                                                { id: 2, title: 'Test Title 2', content: 'Test Content 2', author: 'Test Author 2' }
                                                                                                              ],
                                                                                                              totalPages: 2,
                                                                                                              currentPage: 1,
                                                                                                            })),
                                                 deletePost: jasmine.createSpy('deletePost').and.returnValue(of({})),
                                               },
                                             },
                                           ],
                                         }).compileComponents();

    fixture = TestBed.createComponent(BlogListComponent);
    component = fixture.componentInstance;
    blogService = TestBed.inject(BlogService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load blog posts on initialization', () => {
    expect(blogService.getPosts).toHaveBeenCalledWith(1, 10);  // Check if getPosts is called with correct parameters
    expect(component.posts.length).toBe(2);  // Ensure posts are loaded
    expect(component.totalPages).toBe(2);
    expect(component.currentPage).toBe(1);
  });

  it('should load posts for the specified page on page change', () => {
    component.onPageChange(2);

    expect(blogService.getPosts).toHaveBeenCalledWith(2, 10);  // Check if getPosts is called with new page number
    expect(component.currentPage).toBe(1);
  });

  it('should confirm deletion and call deletePost method', () => {
    spyOn(window, 'confirm').and.returnValue(true);  // Mock window.confirm to return true
    const deleteSpy = spyOn(component, 'deletePost');

    component.confirmDelete(1);

    expect(deleteSpy).toHaveBeenCalledWith(1);  // Ensure deletePost is called when confirm returns true
  });

  it('should not call deletePost method if confirmation is cancelled', () => {
    spyOn(window, 'confirm').and.returnValue(false);  // Mock window.confirm to return false
    const deleteSpy = spyOn(component, 'deletePost');

    component.confirmDelete(1);

    expect(deleteSpy).not.toHaveBeenCalled();  // Ensure deletePost is not called when confirm returns false
  });

  it('should delete a blog post and reload posts', () => {
    spyOn(component, 'loadPosts');  // Spy on loadPosts method
    component.deletePost(1);

    expect(blogService.deletePost).toHaveBeenCalledWith(1);  // Check if deletePost is called with correct post ID
    expect(component.loadPosts).toHaveBeenCalled();  // Ensure loadPosts is called after deletion
  });
});
