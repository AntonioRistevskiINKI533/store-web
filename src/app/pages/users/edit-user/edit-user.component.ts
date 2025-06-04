import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UpdateUserRequest, RoleData } from 'src/app/api/client';
import { SnackBarHelper } from 'src/app/helpers/snack-bar.helper';
import { RoleService } from 'src/app/services/role-service';
import { UserService } from 'src/app/services/user-service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  @ViewChild('mainNgForm') mainNgForm: NgForm;
  mainForm: FormGroup;

  roles: RoleData[];
  body: UpdateUserRequest | undefined = new UpdateUserRequest();
  
  constructor(
    private _userService:UserService, 
    private _roleService:RoleService, 
    private _formBuilder:FormBuilder,
    private _snackBarHelper: SnackBarHelper,
    public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
      this.body!.id = data.id;
  }

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
    this.getAllRoles();
    this.getUser();
  }

  getUser() {
    this._userService.getUser(this.body!.id).subscribe({
      next: data => {
        this.body!.email = data.email!;
        this.body!.name = data.name!;
        this.body!.surname = data.surname!;
        this.body!.username = data.username!;
        this.body!.roleId = data.roleId!;
      },
      error: err => {
        this._snackBarHelper.error(err);
      }
    });
  }

  editUser() {
    if (this.mainNgForm.invalid) {
      this._snackBarHelper.error('Please fill in all required fields');
      return;
    }

    this._userService.updateUser(this.body).subscribe({
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
    this._roleService.getAll().subscribe(data => {
      this.roles = data;
    });
  }

}