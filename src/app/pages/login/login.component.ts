import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { LoginRequest } from 'src/app/api/client';
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
    ) 
    { }

  ngOnInit(): void {
    this.body = new LoginRequest();
    this.loginForm = this._formBuilder.group({
      username: [null],
      password: [null],
    })
  }

  login(){
    this._userService.login(this.body).subscribe(data => {
      sessionStorage.setItem("token", data.token!);
    });
  }
}