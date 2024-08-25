import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing'; // Import RouterTestingModule to support RouterOutlet

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
                                           imports: [AppComponent, RouterTestingModule], // Add RouterTestingModule to the imports
                                         }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have the 'blog-client' title`, () => {
    expect(app.title).toEqual('blog-client');
  });

  it('should contain footer text', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const footer = compiled.querySelector('footer p');
    expect(footer?.textContent).toContain('© 2024 Blog Client Application');
  });

  it('should initialize with an empty global error message', () => {
    expect(app.globalErrorMessage).toBe('');
  });

  it('should set and clear global error message', () => {
    const errorMessage = 'An unexpected error occurred.';

    app.setError(errorMessage);
    expect(app.globalErrorMessage).toBe(errorMessage);

    app.clearError();
    expect(app.globalErrorMessage).toBe('');
  });

  it('should display global error message in UI when set', () => {
    const errorMessage = 'An unexpected error occurred.';
    app.setError(errorMessage);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const errorElement = compiled.querySelector('.alert-danger');
    expect(errorElement?.textContent).toContain(errorMessage);
  });
});
