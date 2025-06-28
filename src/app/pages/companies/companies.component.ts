import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CompanyData } from 'src/app/api/client';
import { CompanyService } from 'src/app/services/company-service';
import { DeleteComponent } from '../dashboards/delete/delete.component';
import { AddCompanyComponent } from './add-company/add-company.component';
import { EditCompanyComponent } from './edit-company/edit-company.component';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent {

  displayedColumns: string[] = ['name', 'address', 'phone', 'button'];
  dataSource = new MatTableDataSource<CompanyData>();
  totalItems: number

  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(
    private _companyService: CompanyService, 
    private _dialog: MatDialog
    ) 
    { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.getAllCompaniesPaged();
  }

  getAllCompaniesPaged() {
    this._companyService.getAllPaged(this.paginator.pageIndex, this.paginator.pageSize).subscribe({
      next: data => {
        this.dataSource = new MatTableDataSource<CompanyData>(data.items!);
        this.totalItems = data.totalItems!;
      },
      error: err => {
        console.error('Error fetching companies:');
      }
    });
  }

  openAddPopup() {
    const dialogRef = this._dialog.open(AddCompanyComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
      this.getAllCompaniesPaged();
      }
    });
  }

  openEditPopup(id: number) {
    const dialogRef = this._dialog.open(EditCompanyComponent, {
      width: '400px',
      data: {
        id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
      this.getAllCompaniesPaged();
      }
    });
  }

  openDeletePopup(id: number, name: string) {
    const dialogRef = this._dialog.open(DeleteComponent, {
      width: '400px',
      data: {
        id,
        item: 'company',
        text: name
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
      this.getAllCompaniesPaged();
      }
    });
  }

}