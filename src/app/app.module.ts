import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSidenavModule} from '@angular/material/sidenav';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';

import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { environment } from './environments/environment';

import { NgApexchartsModule } from "ng-apexcharts";
import { API_BASE_URL, ApiClient } from './api/client';
import { UsersComponent } from './pages/users/users.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthInterceptor } from './api/interceptor';
import { DashboardsComponent } from './pages/dashboards/dashboards.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AddUserComponent } from './pages/users/add-user/add-user.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    LoginComponent,
    DashboardsComponent,
    ProfileComponent,
    AddUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule, 
    MatFormFieldModule, 
    MatSelectModule, 
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    BrowserModule,
    NgApexchartsModule,
    MatTabsModule,
    MatDialogModule
    //CanvasJSAngularChartsModule,
    //Client,
  ],
  providers: [
    ApiClient,
    { provide: API_BASE_URL, useValue: environment.apiBaseUrl },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
