import { Routes } from '@angular/router';
import { BlogListComponent } from './components/blog-list/blog-list.component';
import { BlogCreateComponent } from './components/blog-create/blog-create.component';
import { BlogEditComponent } from './components/blog-edit/blog-edit.component';
import { BlogViewComponent } from './components/blog-view/blog-view.component';

export const routes: Routes = [
  { path: '', component: BlogListComponent },
  { path: 'create', component: BlogCreateComponent },
  { path: 'edit/:id', component: BlogEditComponent },
  { path: 'view/:id', component: BlogViewComponent },
];
