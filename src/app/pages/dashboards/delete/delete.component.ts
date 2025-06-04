import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddUserRequest, RoleData } from 'src/app/api/client';
import { SnackBarHelper } from 'src/app/helpers/snack-bar.helper';
import { UserService } from 'src/app/services/user-service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent {

  id: number | undefined;
  item: string | undefined;
  text: string | undefined;
  body: AddUserRequest | undefined = new AddUserRequest();
  
  constructor(
    private _userService:UserService, 
    private _snackBarHelper: SnackBarHelper,
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
      this.id = data.id;
      this.item = data.item;
      this.text = data.text;
  }

  delete() {
    if (this.item === 'user') {
      this._userService.removeUser(this.id).subscribe({
        next: data => {
          this._snackBarHelper.success();
          this.dialogRef.close(true);
        },
        error: err => {
          this._snackBarHelper.error(err);
        }
      });
    }
  }

}