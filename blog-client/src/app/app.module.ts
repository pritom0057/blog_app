import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';  // Import HttpClientModule
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { routes } from './app.routes';  // Your routes

@NgModule({
            declarations: [
              AppComponent
              // Add other components here if they're not standalone
            ],
            imports: [
              BrowserModule,
              HttpClientModule,  // Ensure HttpClientModule is imported here
              RouterModule.forRoot(routes)
            ],
            providers: [],
            bootstrap: [AppComponent]
          })
export class AppModule { }
