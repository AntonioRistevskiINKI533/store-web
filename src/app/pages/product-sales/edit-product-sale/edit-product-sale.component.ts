import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductData, UpdateProductSaleRequest } from 'src/app/api/client';
import { SnackBarHelper } from 'src/app/helpers/snack-bar.helper';
import { ProductSaleService } from 'src/app/services/product-sale-service';
import { ProductService } from 'src/app/services/product-service';

@Component({
  selector: 'app-edit-product-sale',
  templateUrl: './edit-product-sale.component.html',
  styleUrls: ['./edit-product-sale.component.scss']
})
export class EditProductSaleComponent implements OnInit {

  @ViewChild('mainNgForm') mainNgForm: NgForm;
  mainForm: FormGroup;

  time: string;
  products: ProductData[] = [];
  body: UpdateProductSaleRequest | undefined = new UpdateProductSaleRequest();

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
    public dialogRef: MatDialogRef<EditProductSaleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
      this.body!.id = data.id;
  }

  ngOnInit(): void {
    this.mainForm = this._formBuilder.group({
      product:[null, [Validators.required]],
      date: [null, [Validators.required]],
      time: [null, [Validators.required]],
      pricePerUnit: [null, [Validators.required]],
      soldAmount: [null, [Validators.required]],
    })
  }

  ngAfterViewInit() {
    this.getAllProductsPaged();
    this.getProductSale();
  }

  getProductSale() {
    this._productSaleService.getProductSale(this.body!.id).subscribe({
      next: data => {
        this.body!.productId = data.productId!;
        this.body!.date = data.date!;
        this.body!.pricePerUnit = data.pricePerUnit!;
        this.body!.soldAmount = data.soldAmount!;

        const date = new Date(this.body!.date);
        this.time = `${date.getHours().toString().length < 2 ? '0' : ''}${date.getHours()}:${date.getMinutes().toString().length < 2 ? '0' : ''}${date.getMinutes()}`
      },
      error: err => {
        this._snackBarHelper.error(err);
      }
    });
  }

  editProductSale() {
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

    this._productSaleService.updateProductSale(this.body).subscribe({
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