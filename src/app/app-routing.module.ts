import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './pages/users/users.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardsComponent } from './pages/dashboards/dashboards.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  { path:'', redirectTo: 'login', pathMatch: 'full'},
  { path:'login', component:LoginComponent},
  { path:'dashboards', component:DashboardsComponent, children: [
    { path:'profile', component:ProfileComponent },
    { path:'users', component:UsersComponent },
    { path:'products', component:UsersComponent },
    { path:'companies', component:UsersComponent },
    { path:'productSales', component:UsersComponent },
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
