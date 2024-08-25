import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { BlogCreateComponent } from './blog-create.component';
import { BlogService } from '../../services/blog.service';
import { of } from 'rxjs';

describe('BlogCreateComponent', () => {
  let component: BlogCreateComponent;
  let fixture: ComponentFixture<BlogCreateComponent>;
  let blogService: BlogService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
                                           imports: [BlogCreateComponent, RouterTestingModule, FormsModule], // Ensure correct modules are imported
                                           providers: [
                                             {
                                               provide: BlogService,
                                               useValue: {
                                                 createPost: jasmine.createSpy('createPost').and.returnValue(of({})), // Mock createPost method
                                               },
                                             },
                                           ],
                                         }).compileComponents();

    fixture = TestBed.createComponent(BlogCreateComponent);
    component = fixture.componentInstance;
    blogService = TestBed.inject(BlogService);
    router = TestBed.inject(Router); // Inject Router
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call createPost on BlogService when creating a post', () => {
    component.post = { title: 'New Title', content: 'New Content', author: 'New Author' };

    component.createPost();

    expect(blogService.createPost).toHaveBeenCalledWith(component.post); // Check if createPost is called with correct data
  });

  it('should navigate to the home page after creating a post', () => {
    const navigateSpy = spyOn(router, 'navigate');

    component.createPost();

    expect(navigateSpy).toHaveBeenCalledWith(['/']); // Check if navigation to home occurs after creating a post
  });

  it('should navigate back to the home page on goBack', () => {
    const navigateSpy = spyOn(router, 'navigate');

    component.goBack();

    expect(navigateSpy).toHaveBeenCalledWith(['/']); // Check if goBack navigates to home
  });
});
