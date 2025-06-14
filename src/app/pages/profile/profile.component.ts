import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RoleData, UpdateUserProfileRequest, UserData } from 'src/app/api/client';
import { SnackBarHelper } from 'src/app/helpers/snack-bar.helper';
import { RoleService } from 'src/app/services/role-service';
import { UserService } from 'src/app/services/user-service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  @ViewChild('mainNgForm') mainNgForm: NgForm;
  mainForm: FormGroup;

  fullName: string | undefined;
  roleId: number | undefined;
  roles: RoleData[];
  body: UpdateUserProfileRequest | undefined = new UpdateUserProfileRequest();
  userData: UserData | undefined = new UserData();
  
  constructor(
    private _userService: UserService, 
    private _roleService: RoleService, 
    private _formBuilder: FormBuilder,
    private _snackBarHelper: SnackBarHelper,
    ) 
    { }

  ngOnInit(): void {
    this.mainForm = this._formBuilder.group({
      username: [null, [Validators.required]],
      email: [null, [Validators.required]],
      name:[null, [Validators.required]],
      surname: [null, [Validators.required]],
      role: [null, [Validators.required]],
    })
  }

  ngAfterViewInit() {
    this.getProfile();
    this.getAllRoles();
  }

  getProfile(){
    this._userService.getProfile().subscribe(data => {
      this.userData = data;
    });
  }

  updateUserProfile(){
    this.body!.username = this.userData!.username!;
    this.body!.email = this.userData!.email!;
    this.body!.name = this.userData!.name!;
    this.body!.surname = this.userData!.surname!;
    this._userService.updateUserProfile(this.body).subscribe({
      next: data => {
        this._snackBarHelper.success();
      },
      error: err => {
        this._snackBarHelper.error(err);
      }
    });
  }

  getAllRoles() {
    this._roleService.getAll().subscribe(data => {
      this.roles = data;
    });
  }

}