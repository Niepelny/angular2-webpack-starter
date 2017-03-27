import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home';
import { LoginComponent } from './pages/login';
import { AddCourseComponent } from './pages/courses/addCourse';
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
    path: 'addCourse',
    component: AddCourseComponent
  }, {
    path: 'editCourse/:id',
    component: AddCourseComponent,
    data: {
      type: 'edit'
    }
  }, {
    path: '**',
    component: NoContentComponent
  },
];
