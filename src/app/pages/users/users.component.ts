import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserData } from 'src/app/api/client';
import { UserService } from 'src/app/services/user-service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  @ViewChild('searchNgForm') searchNgForm: NgForm;
  searchForm: FormGroup;

  displayedColumns: string[] = ['username', 'email', 'name', 'surname', 'roleName'];
  dataSource = new MatTableDataSource<UserData>();
  totalItems: number

  @ViewChild(MatPaginator) paginator: MatPaginator;

  fullName: string | undefined
  roleId: number | undefined
  
  constructor(
    private _userService:UserService, 
    private _formBuilder:FormBuilder,
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
    this.getAll();
  }

  getAll(){
    this._userService.getAllPaged(this.paginator.pageIndex, this.paginator.pageSize, this.fullName, this.roleId).subscribe(data => {
      this.dataSource = new MatTableDataSource<UserData>(data.items!);
      this.totalItems = data.totalItems!;
    });
  }

}