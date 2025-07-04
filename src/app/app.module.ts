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
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE, DateAdapter } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';

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
import { EditUserComponent } from './pages/users/edit-user/edit-user.component';
import { DeleteComponent } from './pages/dashboards/delete/delete.component';
import { CompaniesComponent } from './pages/companies/companies.component';
import { AddCompanyComponent } from './pages/companies/add-company/add-company.component';
import { EditCompanyComponent } from './pages/companies/edit-company/edit-company.component';
import { ProductsComponent } from './pages/products/products.component';
import { AddProductComponent } from './pages/products/add-product/add-product.component';
import { EditProductComponent } from './pages/products/edit-product/edit-product.component';
import { ProductSalesComponent } from './pages/product-sales/product-sales.component';
import { AddProductSaleComponent } from './pages/product-sales/add-product-sale/add-product-sale.component';
import { EditProductSaleComponent } from './pages/product-sales/edit-product-sale/edit-product-sale.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProductSalesGraphComponent } from './pages/product-sales-graph/product-sales-graph.component';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    LoginComponent,
    DashboardsComponent,
    ProfileComponent,
    AddUserComponent,
    EditUserComponent,
    DeleteComponent,
    CompaniesComponent,
    AddCompanyComponent,
    EditCompanyComponent,
    ProductsComponent,
    AddProductComponent,
    EditProductComponent,
    ProductSalesComponent,
    AddProductSaleComponent,
    EditProductSaleComponent,
    ProductSalesGraphComponent
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
    MatDialogModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule
  ],
  providers: [
    ApiClient,
    { provide: API_BASE_URL, useValue: environment.apiBaseUrl },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS] },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
