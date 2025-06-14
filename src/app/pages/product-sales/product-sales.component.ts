import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ProductData, ProductSaleData } from 'src/app/api/client';
import { ProductService } from 'src/app/services/product-service';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { DeleteComponent } from '../dashboards/delete/delete.component';
import { ProductSaleService } from 'src/app/services/product-sale-service';

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
  products: ProductData[]
  
  constructor(
    private _productService: ProductService, 
    private _productSaleService: ProductSaleService, 
    private _formBuilder: FormBuilder,
    private _dialog: MatDialog
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
    this._productSaleService.getAllPaged(this.paginator.pageIndex, this.paginator.pageSize, this.dateFrom, this.dateTo, this.productId).subscribe(data => {
      this.dataSource = new MatTableDataSource<ProductData>(data.items!);
      this.totalItems = data.totalItems!;
    });
  }

  getAllProductsPaged() { // use separate call or use paginated ng select
    this._productService.getAllPaged(0, 99999999).subscribe(data => {
      this.products = data.items!;
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
        item: 'productSale',
        text: name
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
      this.getAllProductSalesPaged();
      }
    });
  }

}