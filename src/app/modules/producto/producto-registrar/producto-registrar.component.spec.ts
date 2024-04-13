import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductoRegistrarComponent } from './producto-registrar.component';
import { Producto } from 'src/app/core/models/producto';
import { ProductoService } from 'src/app/core/services/producto.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastService } from 'src/app/core/services/toast.service';
import { DataService } from 'src/app/core/services/data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FiltroPipe } from 'src/app/core/pipes/FiltroPipe';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { FormErrorMessageComponent } from 'src/app/shared/form-error-message/form-error-message.component';

describe('ProductoRegistrarComponent', () => {
  let component: ProductoRegistrarComponent;
  let fixture: ComponentFixture<ProductoRegistrarComponent>;
  let productoService: ProductoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductoRegistrarComponent , FormErrorMessageComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule],
      providers: [DataService, ToastService, ProductoService],
    }).compileComponents();

    productoService = TestBed.inject(ProductoService);

    fixture = TestBed.createComponent(ProductoRegistrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creacion componente registrar producto', () => {
    expect(component).toBeTruthy();
  });

  it('should verificar producto antes de guardar validacion', () => {
    spyOn(productoService, 'Verificacion').and.returnValue(of(true));
    const guardarSpy = spyOn(component, 'fnGuardar').and.callThrough();
    const form = fixture.debugElement.query(By.css('form')).nativeElement;
    form.dispatchEvent(new Event('submit'));
    expect(guardarSpy).not.toHaveBeenCalled();
  });

});
