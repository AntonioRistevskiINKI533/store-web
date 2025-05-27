import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.scss']
})
export class DashboardsComponent {

  constructor(
    private _router:Router,
    ) 
    { }

  logout() {
    sessionStorage.removeItem("token");
    this._router.navigate(['/login']);
  }
}