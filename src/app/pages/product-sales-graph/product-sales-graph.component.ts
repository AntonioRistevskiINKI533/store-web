import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { ProductData } from 'src/app/api/client';

import {
  ChartComponent,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
} from "ng-apexcharts";
import { ProductSaleService } from 'src/app/services/product-sale-service';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-product-sales-graph',
  templateUrl: './product-sales-graph.component.html',
  styleUrls: ['./product-sales-graph.component.scss']
})
export class ProductSalesGraphComponent implements OnInit {

  @ViewChild('searchNgForm') searchNgForm: NgForm;
  searchForm: FormGroup;

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

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  
  constructor(
    private _productSaleService: ProductSaleService, 
    private _formBuilder: FormBuilder,
    ) 
    { 
      this.chartOptions = {
        series: [],//[44, 55, 13, 43, 22],
        chart: {
          width: 1200,
          height: 480,
          type: "pie"
        },
        labels: [],//["Team A", "Team B", "Team C", "Team D", "Team E"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: "bottom"
              }
            }
          }
        ]
      };
    }

  ngOnInit(): void {
    this.searchForm = this._formBuilder.group({
      dateFrom: [''],
      dateTo: [''],
      product: [''],
    })
  }

  ngAfterViewInit() {
    this.getAllForPieChart("pricePerUnit");
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
    this._productSaleService.getAllPaged(this.productPagination.pageIndex, this.productPagination.pageSize).subscribe(data => {
      this.productPagination.totalItems = data.totalItems!;

      const newProducts = data.items ?? [];
      this.products = this.products.length > 0 ? [...this.products, ...newProducts] : newProducts;

      if (this.productPagination.totalItems > this.products.length) {
        this.productPagination.pageIndex++;
      }

    });
  }

  getAllForPieChart(column: string){
    this._productSaleService.getAllPaged(0, 9999999, this.dateFrom, this.dateTo, this.productId).subscribe((data) => {

      this.chartOptions.series! = [];
      this.chartOptions.labels! = [];

      for (var i = 0; i < data.items!.length; i++) {

        if (column == "pricePerUnit") {
          this.chartOptions.series!.push(data.items![i].pricePerUnit as number & { x: any; y: any; fillColor?: string | undefined; strokeColor?: string | undefined; meta?: any; goals?: any; } & [number, number | null] & [number, (number | null)[]]);
        }
        else if (column == "soldAmount") {
          this.chartOptions.series!.push(data.items![i].soldAmount as number & { x: any; y: any; fillColor?: string | undefined; strokeColor?: string | undefined; meta?: any; goals?: any; } & [number, number | null] & [number, (number | null)[]]);
        }

        this.chartOptions.labels!.push(data.items![i].productName);
      }
      
      this.chart.render();
    });
  }
}