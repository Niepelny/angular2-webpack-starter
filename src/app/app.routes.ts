import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home';
import { LoginComponent } from './pages/login';
import { CourseComponent } from './pages/courses';
import { NoContentComponent } from './no-content';
import { DataResolver } from './app.resolver';

export const ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent
  }, {
    path: 'home',
    component: HomeComponent
  }, {
    path: 'login',
    component: LoginComponent
  }, {
    path: 'addCourses',
    component: CourseComponent
  }, {
    path: 'editCourses/:id',
    component: CourseComponent,
    data: {
      type: 'edit'
    }
  }, {
    path: '**',
    component: NoContentComponent
  },
];
