import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { RoleData, UserData } from 'src/app/api/client';
import { RoleService } from 'src/app/services/role-service';
import { UserService } from 'src/app/services/user-service';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { DeleteComponent } from '../dashboards/delete/delete.component';
import { SnackBarHelper } from 'src/app/helpers/snack-bar.helper';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  @ViewChild('searchNgForm') searchNgForm: NgForm;
  searchForm: FormGroup;

  displayedColumns: string[] = ['username', 'email', 'name', 'surname', 'roleName', 'button'];
  dataSource = new MatTableDataSource<UserData>();
  totalItems: number

  @ViewChild(MatPaginator) paginator: MatPaginator;

  fullName: string | undefined
  roleId: number | undefined
  roles: RoleData[]
  
  constructor(
    private _userService:UserService, 
    private _roleService:RoleService, 
    private _formBuilder:FormBuilder,
    private _dialog: MatDialog,
    private _snackBarHelper: SnackBarHelper
    ) 
    { }

  ngOnInit(): void {
    this.searchForm = this._formBuilder.group({
      fullName: [''],
      role: [''],
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.getAllUsersPaged();
    this.getAllRoles();
  }

  getAllUsersPaged() {
    this._userService.getAllPaged(this.paginator.pageIndex, this.paginator.pageSize, this.fullName, this.roleId).subscribe({
      next: data => {
        this.dataSource = new MatTableDataSource<UserData>(data.items!);
        this.totalItems = data.totalItems!;
      },
      error: err => {
        this._snackBarHelper.error('Error fetching users');
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

  openAddPopup() {
    const dialogRef = this._dialog.open(AddUserComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
      this.getAllUsersPaged();
      }
    });
  }

  openEditPopup(id: number) {
    const dialogRef = this._dialog.open(EditUserComponent, {
      width: '400px',
      data: {
        id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
      this.getAllUsersPaged();
      }
    });
  }

  openDeletePopup(id: number, username: string) {
    const dialogRef = this._dialog.open(DeleteComponent, {
      width: '400px',
      data: {
        id,
        item: 'user',
        text: username
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
      this.getAllUsersPaged();
      }
    });
  }

}