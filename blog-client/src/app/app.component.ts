import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
             selector: 'app-root',
             standalone: true,
             imports: [RouterOutlet, CommonModule], // Add CommonModule here
             templateUrl: './app.component.html',
             styleUrls: ['./app.component.css']
           })
export class AppComponent {
  title = 'blog-client';
  globalErrorMessage: string = '';  // Global error message state

  // Method to set the global error message
  setError(message: string): void {
    this.globalErrorMessage = message;
  }

  // Method to clear the global error message
  clearError(): void {
    this.globalErrorMessage = '';
  }
}
