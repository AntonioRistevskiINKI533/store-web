import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ProductData, ProductSaleData } from 'src/app/api/client';
import { ProductService } from 'src/app/services/product-service';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { DeleteComponent } from '../dashboards/delete/delete.component';
import { ProductSaleService } from 'src/app/services/product-sale-service';
import { AddProductSaleComponent } from './add-product-sale/add-product-sale.component';
import { EditProductSaleComponent } from './edit-product-sale/edit-product-sale.component';
import { SnackBarHelper } from 'src/app/helpers/snack-bar.helper';

@Component({
  selector: 'app-product-sales',
  templateUrl: './product-sales.component.html',
  styleUrls: ['./product-sales.component.scss']
})
export class ProductSalesComponent implements OnInit {

  @ViewChild('searchNgForm') searchNgForm: NgForm;
  searchForm: FormGroup;

  displayedColumns: string[] = ['productName', 'date', 'pricePerUnit', 'soldAmount', 'button'];
  dataSource = new MatTableDataSource<ProductSaleData>();
  totalItems: number

  @ViewChild(MatPaginator) paginator: MatPaginator;

  productId: number | undefined
  dateFrom: Date | undefined
  dateTo: Date | undefined
  products: ProductData[] = []

  productPagination: {
    pageIndex: number;
    pageSize: number;
    totalItems: number;
  } = {
    pageIndex: 0,
    pageSize: 20,
    totalItems: 0
  }
  
  constructor(
    private _productService: ProductService, 
    private _productSaleService: ProductSaleService, 
    private _formBuilder: FormBuilder,
    private _dialog: MatDialog,
    private _snackBarHelper: SnackBarHelper
    ) 
    { }

  ngOnInit(): void {
    this.searchForm = this._formBuilder.group({
      dateFrom: [''],
      dateTo: [''],
      product: [''],
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.getAllProductSalesPaged();
    this.getAllProductsPaged();
  }

  getAllProductSalesPaged() {
    this._productSaleService.getAllPaged(this.paginator.pageIndex, this.paginator.pageSize, this.dateFrom, this.dateTo, this.productId).subscribe({
      next: data => {
        this.dataSource = new MatTableDataSource<ProductData>(data.items!);
        this.totalItems = data.totalItems!;
      },
      error: err => {
        this._snackBarHelper.error('Error fetching product sales');
      }
    });
  }

  onProductSelectOpened() {
    setTimeout(() => {
      const panel = document.querySelector('.mat-select-panel');
      if (panel) {
        panel.addEventListener('scroll', this.onProductScroll.bind(this));
      }
    });
  }

  onProductScroll(event: any) {
    const target = event.target;
    if (target.scrollTop + target.clientHeight >= target.scrollHeight - 10 && (this.productPagination.totalItems > this.products.length)) {
      this.getAllProductsPaged();
    }
  }

  getAllProductsPaged() {
    this._productService.getAllPaged(this.productPagination.pageIndex, this.productPagination.pageSize).subscribe({
      next: data => {
        this.productPagination.totalItems = data.totalItems!;

        const newProducts = data.items ?? [];
        this.products = this.products.length > 0 ? [...this.products, ...newProducts] : newProducts;

        if (this.productPagination.totalItems > this.products.length) {
          this.productPagination.pageIndex++;
        }
      }, error: err => {
        this._snackBarHelper.error('Error fetching products');
      }
    });
  }

  openAddPopup() {
    const dialogRef = this._dialog.open(AddProductSaleComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
      this.getAllProductSalesPaged();
      }
    });
  }

  openEditPopup(id: number) {
    const dialogRef = this._dialog.open(EditProductSaleComponent, {
      width: '400px',
      data: {
        id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
      this.getAllProductSalesPaged();
      }
    });
  }

  openDeletePopup(id: number, name: string, date: Date) {
    const dialogRef = this._dialog.open(DeleteComponent, {
      width: '400px',
      data: {
      id,
      item: 'product sale',
      text: name + ', sold on ',
      date: date
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
      this.getAllProductSalesPaged();
      }
    });
  }

}