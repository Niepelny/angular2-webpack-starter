import { NgModule } from '@angular/core';
import { LoginService } from '../core/services/login.service';
import { LoginComponent } from '../pages/login';
import { FormsModule } from '@angular/forms';
import {
  RouterModule,
  PreloadAllModules
} from '@angular/router';

@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [ // import Angular's mod`ules
    FormsModule
  ],
  providers: [
    LoginService,
  ],
})
export class SharedModule {
  constructor (public LoginService: LoginService) {}
}
