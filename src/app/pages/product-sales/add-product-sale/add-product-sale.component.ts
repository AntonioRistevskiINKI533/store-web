import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AddProductSaleRequest, ProductData } from 'src/app/api/client';
import { SnackBarHelper } from 'src/app/helpers/snack-bar.helper';
import { ProductService } from 'src/app/services/product-service';
import { ProductSaleService } from 'src/app/services/product-sale-service';

@Component({
  selector: 'app-add-product-sale',
  templateUrl: './add-product-sale.component.html',
  styleUrls: ['./add-product-sale.component.scss']
})
export class AddProductSaleComponent implements OnInit {

  @ViewChild('mainNgForm') mainNgForm: NgForm;
  mainForm: FormGroup;

  time: string;
  products: ProductData[] = [];
  body: AddProductSaleRequest | undefined = new AddProductSaleRequest();

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
    private _productService:ProductService, 
    private _productSaleService:ProductSaleService, 
    private _formBuilder:FormBuilder,
    private _snackBarHelper: SnackBarHelper,
    public dialogRef: MatDialogRef<AddProductSaleComponent>
    ) 
    { }

  ngOnInit(): void {
    this.mainForm = this._formBuilder.group({
      product:[null, [Validators.required]],
      date: [null],
      time: [null],
      pricePerUnit: [null],
      soldAmount: [null, [Validators.required]],
    })
  }

  ngAfterViewInit() {
    this.getAllProductsPaged();
  }

  addProductSale() {
    if (this.mainNgForm.invalid) {
      this._snackBarHelper.error('Please fill in all required fields');
      return;
    }

    if (this.time && this.body!.date) {
      this.body!.date = new Date(this.body!.date);
      const [hours, minutes] = this.time.toString().split(':').map(Number);
      this.body!.date.setHours(hours);
      this.body!.date.setMinutes(minutes);
    }

    this._productSaleService.addProductSale(this.body).subscribe({
      next: data => {
        this._snackBarHelper.success();
        this.dialogRef.close(true);
      },
      error: err => {
        this._snackBarHelper.error(err);
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
      },
      error: err => {
        this._snackBarHelper.error('Error fetching products');
      }
    });
  }

}