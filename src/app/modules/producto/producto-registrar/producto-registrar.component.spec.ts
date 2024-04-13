import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoRegistrarComponent } from './producto-registrar.component';

describe('ProductoRegistrarComponent', () => {
  let component: ProductoRegistrarComponent;
  let fixture: ComponentFixture<ProductoRegistrarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductoRegistrarComponent]
    });
    fixture = TestBed.createComponent(ProductoRegistrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
