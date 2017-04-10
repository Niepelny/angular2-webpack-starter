// modules
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

// Services
import { PopupService } from '../service/popup.service';

// Components
import { PopupComponent } from '../component/popup.component';

@NgModule({
  imports: [
    FormsModule,
    BrowserModule,
  ],
  exports: [
    PopupComponent
  ],
  declarations: [
    PopupComponent,
  ],
  providers: [
    PopupService,
  ],
})
export class PopupModule { }
