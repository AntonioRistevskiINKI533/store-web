import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSalesGraphComponent } from './product-sales-graph.component';

describe('ProductSalesGraphComponent', () => {
  let component: ProductSalesGraphComponent;
  let fixture: ComponentFixture<ProductSalesGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductSalesGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSalesGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
