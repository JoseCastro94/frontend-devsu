import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoEditarComponent } from './producto-editar.component';

describe('ProductoEditarComponent', () => {
  let component: ProductoEditarComponent;
  let fixture: ComponentFixture<ProductoEditarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductoEditarComponent]
    });
    fixture = TestBed.createComponent(ProductoEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
