import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ProductoEditarComponent } from './producto-editar.component';
import { Producto } from 'src/app/core/models/producto';
import { ProductoService } from 'src/app/core/services/producto.service';
import { of, throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastService } from 'src/app/core/services/toast.service';
import { DataService } from 'src/app/core/services/data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { FormErrorMessageComponent } from 'src/app/shared/form-error-message/form-error-message.component';
import { ActivatedRoute, Router } from '@angular/router';

describe('ProductoEditarComponent', () => {
  let component: ProductoEditarComponent;
  let fixture: ComponentFixture<ProductoEditarComponent>;
  let productoService: ProductoService;
  let dataService: DataService;
  let router: Router;
  let toastService: ToastService;
  let activatedRoute: ActivatedRoute;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductoEditarComponent, FormErrorMessageComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule],
      providers: [DataService, ToastService, ProductoService,
        {
          provide: Router,
          useValue: routerSpy
        },
        {
          provide: ActivatedRoute,
          useValue: { params: of({ id: 'P001' }) }
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductoEditarComponent);
    component = fixture.componentInstance;
    productoService = TestBed.inject(ProductoService);
    toastService = TestBed.inject(ToastService);
    dataService = TestBed.inject(DataService);
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('Creacion del componente', () => {
    expect(component).toBeTruthy();
  });

  it('Calcular la fecha mínima de revisión', () => {
    const fechaLiberacion = new Date('2023-01-12');
    const expectedMinDate = new Date('2024-01-12').toISOString().split('T')[0];
    const result = component.fnCalcularFechaMinimaRevision(fechaLiberacion);
    expect(result).toEqual(expectedMinDate);
  });

  it('Navegar a la página de la lista si no se encuentra el producto', () => {
    const fakeProduct: Producto = {
      id: 'P002',
      name: 'Producto 2',
      description: 'Descripción 2',
      date_release: '2023-02-11',
      date_revision: '2023-06-11',
      logo: 'logo2.jpg',
    };
    spyOn(dataService, 'getData').and.returnValue([fakeProduct]);
    component.fnBuscarProducto('P001');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/listar']);
  });

  it('Buscar un producto', () => {
    const mockProducto = {
      id: 'P001',
      name: 'Producto 1',
      description: 'Descripción 1',
      date_release: '2023-01-12',
      date_revision: '2024-02-12',
      logo: 'logo1.jpg',
    };

    spyOn(dataService, 'getData').and.returnValue([mockProducto]);
    component.fnBuscarProducto('P001');
    expect(component.producto).toEqual(mockProducto);
  });


  it('Manejar el error al guardar el producto', fakeAsync(() => {
    const mockForm: any = {};

    spyOn(productoService, 'GuardarDatos').and.returnValue(throwError('Error al guardar'));
    spyOn(toastService, 'error');
    spyOn(console, 'log').and.callThrough();
    component.fnGuardar(mockForm);
    tick();
  }));
});
