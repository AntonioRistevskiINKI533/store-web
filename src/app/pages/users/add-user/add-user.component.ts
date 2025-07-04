import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AddUserRequest, RoleData } from 'src/app/api/client';
import { SnackBarHelper } from 'src/app/helpers/snack-bar.helper';
import { RoleService } from 'src/app/services/role-service';
import { UserService } from 'src/app/services/user-service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  @ViewChild('mainNgForm') mainNgForm: NgForm;
  mainForm: FormGroup;

  confirmPassword: string;
  roles: RoleData[];
  body: AddUserRequest | undefined = new AddUserRequest();
  
  constructor(
    private _userService:UserService, 
    private _roleService:RoleService, 
    private _formBuilder:FormBuilder,
    private _snackBarHelper: SnackBarHelper,
    public dialogRef: MatDialogRef<AddUserComponent>
    ) 
    { }

  ngOnInit(): void {
    this.mainForm = this._formBuilder.group({
      username: [null, [Validators.required]],
      email: [null, [Validators.required]],
      name:[null, [Validators.required]],
      surname: [null, [Validators.required]],
      role: [null, [Validators.required]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
    })
  }

  ngAfterViewInit() {
    this.getAllRoles();
  }

  addUser() {
    if (this.mainNgForm.invalid) {
      this._snackBarHelper.error('Please fill in all required fields');
      return;
    }

    if (this.body!.password !== this.confirmPassword) {
      this._snackBarHelper.error('Passwords do not match');
      return;
    }

    this._userService.addUser(this.body).subscribe({
      next: data => {
        this._snackBarHelper.success();
        this.dialogRef.close(true);
      },
      error: err => {
        this._snackBarHelper.error(err);
      }
    });
  }

  getAllRoles() {
    this._roleService.getAll().subscribe({
      next: data => {
        this.roles = data;
      },
      error: err => {
        this._snackBarHelper.error('Error fetching roles');
      }
    });
  }

}