import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home';
import { LoginComponent } from './pages/login';
import { AddCourseComponent } from './pages/courses/addCourse';
import { NoContentComponent } from './no-content';
import { DataResolver } from './app.resolver';
import { PageNotFoundComponent } from './pages/pageNotFound';

export const ROUTES: Routes = [
  {
    path: 'courses',
    component: HomeComponent
  }, {
    path: '',
    redirectTo: '/courses',
    pathMatch: 'full'
  }, {
    path: 'home',
    component: HomeComponent
  }, {
    path: 'login',
    component: LoginComponent
  }, {
    path: 'courses/new',
    component: AddCourseComponent
  }, {
    path: 'courses/:id',
    component: AddCourseComponent,
    data: {
      type: 'edit'
    }
  }, {
    path: '**',
    component: PageNotFoundComponent
  },
];
