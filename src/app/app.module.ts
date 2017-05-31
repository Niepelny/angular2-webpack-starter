import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LoaderService } from './core/services/loader.service';
import {
  NgModule,
  ApplicationRef
} from '@angular/core';
import {
  removeNgStyles,
  createNewHosts,
  createInputTransfer
} from '@angularclass/hmr';
import {
  RouterModule,
  PreloadAllModules
} from '@angular/router';
import '../styles/styles.scss';

import { SharedModule } from './modules/shared.module';
import { PopupModule } from './popup/module/popup.module';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';
import { HomeComponent } from './pages/home';
import { CourseComponent } from './pages/courses/course';
import { AddCourseComponent } from './pages/courses/addCourse';
import { LoaderComponent } from './core/components/loader';
import { EditCourseComponent } from './pages/courses/editCourse';
import { PageNotFoundComponent } from './pages/pageNotFound';
import { HeaderComponent } from './header';
import { FooterComponent } from './footer';
import { CourseNavigationComponent } from './pages/coursesnavigation';
import { NoContentComponent } from './no-content';
import { XLargeDirective } from './pages/home/x-large';
import '../styles/styles.scss';
import '../styles/headings.css';

import { HighlightDirective } from './core/directives/hightLight.directive';
import { RaitingDirective } from './core/directives/raiting.directives';
import { DurationPipe } from './core/pipes/duration.pipe';
import { OrderByDatePipe } from './core/pipes/orderByDate.pipe';
import { FilterByNamePipe } from './core/pipes/filterByName.pipe';
import { ColorPipe } from './core/pipes/color.pipe.ts';
import { FilterOutdatedPipe } from './core/pipes/filterOutDated.pipe.ts';

import { DateValidatorDirective } from './core/directives/dateValidator.directive';

import { AngularFireModule } from 'angularfire2';
import { Ng2BreadcrumbModule, BreadcrumbService } from 'ng2-breadcrumb/ng2-breadcrumb';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

export const firebaseConfig = {
  apiKey: 'AIzaSyC3WHSwkL-6K3qB50_vaYMk_f_nm87kePE',
  authDomain: 'angular-2-training-657da.firebaseapp.com',
  databaseURL: 'https://angular-2-training-657da.firebaseio.com',
  projectId: 'angular-2-training-657da',
  storageBucket: 'angular-2-training-657da.appspot.com',
  messagingSenderId: '175028819450'
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    HighlightDirective,
    HomeComponent,
    HeaderComponent,
    DateValidatorDirective,
    FooterComponent,
    AddCourseComponent,
    LoaderComponent,
    PageNotFoundComponent,
    FilterByNamePipe,
    EditCourseComponent,
    CourseComponent,
    OrderByDatePipe,
    FilterOutdatedPipe,
    DurationPipe,
    ColorPipe,
    NoContentComponent,
    RaitingDirective,
    CourseNavigationComponent,
    XLargeDirective
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    SharedModule,
    PopupModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules }),
    AngularFireModule.initializeApp(firebaseConfig),
    Ng2BreadcrumbModule.forRoot()
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS,
    LoaderService,
    FilterByNamePipe,
    BreadcrumbService
  ]
})
export class AppModule {

  constructor(
    public appRef: ApplicationRef,
    public appState: AppState,
  ) { }

  public hmrOnInit(store: StoreType) {
    if (!store || !store.state) {
      return;
    }
    console.log('HMR store', JSON.stringify(store, null, 2));
    // set state
    this.appState._state = store.state;
    // set input values
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  public hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
    // save state
    const state = this.appState._state;
    store.state = state;
    // recreate root elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // save input values
    store.restoreInputValues = createInputTransfer();
    // remove styles
    removeNgStyles();
  }

  public hmrAfterDestroy(store: StoreType) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}
