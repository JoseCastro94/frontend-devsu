import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ProductoRegistrarComponent } from './producto-registrar.component';
import { ProductoService } from 'src/app/core/services/producto.service';
import { of, throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastService } from 'src/app/core/services/toast.service';
import { DataService } from 'src/app/core/services/data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { FormErrorMessageComponent } from 'src/app/shared/form-error-message/form-error-message.component';

describe('ProductoRegistrarComponent', () => {
  let component: ProductoRegistrarComponent;
  let fixture: ComponentFixture<ProductoRegistrarComponent>;
  let productoService: ProductoService;
  let toastService: ToastService;

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

  it('Creacion componente registrar producto', () => {
    expect(component).toBeTruthy();
  });

  it('Verificar producto antes de guardar validacion', () => {
    spyOn(productoService, 'Verificacion').and.returnValue(of(true));
    const guardarSpy = spyOn(component, 'fnGuardar').and.callThrough();
    const form = fixture.debugElement.query(By.css('form')).nativeElement;
    form.dispatchEvent(new Event('submit'));
    expect(guardarSpy).not.toHaveBeenCalled();
  });

  it('Calcular la fecha mínima de revisión correctamente', () => {
    const fechaLiberacion = new Date('2023-01-12');
    const expectedMinDate = new Date('2024-01-12').toISOString().split('T')[0];
    const result = component.fnCalcularFechaMinimaRevision(fechaLiberacion);
    expect(result).toEqual(expectedMinDate);
  });

  it('Manejar el error al guardar el producto', fakeAsync(() => {
    const mockForm: any = {};

    spyOn(productoService, 'GuardarDatos').and.returnValue(throwError('Error al guardar'));
    spyOn(console, 'log').and.callThrough();
    component.fnGuardar(mockForm);
    tick();
  }));
});
