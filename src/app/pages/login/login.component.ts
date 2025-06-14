import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/api/client';
import { SnackBarHelper } from 'src/app/helpers/snack-bar.helper';
import { UserService } from 'src/app/services/user-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('loginNgForm') loginNgForm: NgForm;
  loginForm: FormGroup;
    
  body: LoginRequest
  
  constructor(
    private _userService:UserService, 
    private _formBuilder:FormBuilder,
    private _router:Router,
    private _snackBarHelper: SnackBarHelper,
    ) 
    { }

  ngOnInit(): void {
    this.body = new LoginRequest();
    this.loginForm = this._formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    })
  }

  login(){
    this._userService.login(this.body).subscribe({
      next: data => {
        this._snackBarHelper.success();
        sessionStorage.setItem("token", data.token!);
        this._router.navigate(['/dashboards/profile']);
      },
      error: err => {
        this._snackBarHelper.error(err);
      }
    });
  }
}