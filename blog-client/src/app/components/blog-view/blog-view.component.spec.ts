import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BlogViewComponent } from './blog-view.component';
import { BlogService } from '../../services/blog.service';
import { of } from 'rxjs';

describe('BlogViewComponent', () => {
  let component: BlogViewComponent;
  let fixture: ComponentFixture<BlogViewComponent>;
  let blogService: BlogService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
                                           imports: [BlogViewComponent, RouterTestingModule],
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

    fixture = TestBed.createComponent(BlogViewComponent);
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
    expect(component.post).toEqual({
                                     id: 1,
                                     title: 'Test Title',
                                     content: 'Test Content',
                                     author: 'Test Author'
                                   });
  });

  it('should navigate back to the home page on goBack', () => {
    const navigateSpy = spyOn(router, 'navigate');

    component.goBack();

    expect(navigateSpy).toHaveBeenCalledWith(['/']);  // Check if goBack navigates to home
  });
});
