import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './pages/users/users.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  { path:'', redirectTo: 'login', pathMatch: 'full'},
  { path:'login', component:LoginComponent},
  { path:'home', component:UsersComponent, children: [
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
