import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { RoleData, UpdateUserProfileRequest, UserData } from 'src/app/api/client';
import { RoleService } from 'src/app/services/role-service';
import { UserService } from 'src/app/services/user-service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  @ViewChild('searchNgForm') searchNgForm: NgForm;
  searchForm: FormGroup;

  displayedColumns: string[] = ['username', 'email', 'name', 'surname', 'roleName'];
  dataSource = new MatTableDataSource<UserData>();
  totalItems: number

  @ViewChild(MatPaginator) paginator: MatPaginator;

  fullName: string | undefined;
  roleId: number | undefined;
  roles: RoleData[];
  body: UpdateUserProfileRequest | undefined = new UpdateUserProfileRequest();
  userData: UserData | undefined = new UserData();
  
  constructor(
    private _userService:UserService, 
    private _roleService:RoleService, 
    private _formBuilder:FormBuilder,
    ) 
    { }

  ngOnInit(): void {
    this.searchForm = this._formBuilder.group({
      username: [null, [Validators.required]],
      email: [null, [Validators.required]],
      name:[null, [Validators.required]],
      surname: [null, [Validators.required]],
      role: [null, [Validators.required]],
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
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
    this._userService.updateUserProfile(this.body).subscribe(data => {
    });
  }

  getAllRoles() {
    this._roleService.getAll().subscribe(data => {
      this.roles = data;
    });
  }

}