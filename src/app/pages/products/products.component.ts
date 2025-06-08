import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CompanyData, ProductData } from 'src/app/api/client';
import { ProductService } from 'src/app/services/product-service';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { DeleteComponent } from '../dashboards/delete/delete.component';
import { CompanyService } from 'src/app/services/company-service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  @ViewChild('searchNgForm') searchNgForm: NgForm;
  searchForm: FormGroup;

  displayedColumns: string[] = ['registrationNumber', 'name', 'price', 'companyName', 'button'];
  dataSource = new MatTableDataSource<ProductData>();
  totalItems: number

  @ViewChild(MatPaginator) paginator: MatPaginator;

  productName: string | undefined
  companyId: number | undefined
  companies: CompanyData[] // may have to change
  
  constructor(
    private _productService: ProductService, 
    private _companyService: CompanyService,
    private _formBuilder: FormBuilder,
    private _dialog: MatDialog
    ) 
    { }

  ngOnInit(): void {
    this.searchForm = this._formBuilder.group({
      productName: [''],
      company: [''],
    })
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.getAllProductsPaged();
    this.getAllCompaniesPaged();
  }

  getAllProductsPaged() {
    this._productService.getAllPaged(this.paginator.pageIndex, this.paginator.pageSize, this.companyId, this.productName).subscribe(data => {
      this.dataSource = new MatTableDataSource<ProductData>(data.items!);
      this.totalItems = data.totalItems!;
    });
  }

  getAllCompaniesPaged() { // user separate call or use paginated ng select
    this._companyService.getAllPaged(0, 99999999).subscribe(data => {
      this.companies = data.items!;
    });
  }

  openAddPopup() {
    // const dialogRef = this._dialog.open(AddProductComponent, {
    //   width: '400px',
    //   data: {}
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result === true) {
    //   this.getAllProductsPaged();
    //   }
    // });
  }

  openEditPopup(id: number) {
    // const dialogRef = this._dialog.open(EditProductComponent, {
    //   width: '400px',
    //   data: {
    //     id
    //   }
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result === true) {
    //   this.getAllProductsPaged();
    //   }
    // });
  }

  openDeletePopup(id: number, name: string) {
    const dialogRef = this._dialog.open(DeleteComponent, {
      width: '400px',
      data: {
        id,
        item: 'product',
        text: name
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
      this.getAllProductsPaged();
      }
    });
  }

}