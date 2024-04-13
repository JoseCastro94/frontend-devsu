import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductoListarComponent } from './producto-listar.component';
import { Producto } from 'src/app/core/models/producto';
import { ProductoService } from 'src/app/core/services/producto.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastService } from 'src/app/core/services/toast.service';
import { DataService } from 'src/app/core/services/data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FiltroPipe } from 'src/app/core/pipes/FiltroPipe';

describe('ProductoListarComponent', () => {
  let component: ProductoListarComponent;
  let fixture: ComponentFixture<ProductoListarComponent>;
  let productoService: ProductoService;

  let productos: Producto[] = [
    {
      id: 'P001',
      name: 'Producto 1',
      description: 'Descripción 1',
      date_release: '2023-01-12',
      date_revision: '2024-02-12',
      logo: 'logo1.jpg',
    },
    {
      id: 'P002',
      name: 'Producto 2',
      description: 'Descripción 2',
      date_release: '2023-02-11',
      date_revision: '2023-06-11',
      logo: 'logo2.jpg',
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductoListarComponent, FiltroPipe],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [DataService, ToastService, ProductoService],
    }).compileComponents();

    productoService = TestBed.inject(ProductoService);

    fixture = TestBed.createComponent(ProductoListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creacion componente listar producto', () => {
    expect(component).toBeTruthy();
  });

  it('should productos listar', () => {
    spyOn(productoService, 'ListarTodos').and.returnValue(of(productos));
    component.ngOnInit();
    expect(component.productos.length).toBe(productos.length);
  });

  it('should producto eliminar', () => {
    const id = 'P001';

    spyOn(component, 'fnListarTodos');
    spyOn(component, 'fnCancelarEliminar');
    spyOn(productoService, 'Eliminar').and.returnValue(of(null));

    component.producto.id = id;
    component.fnConfirmarEliminar();

    expect(productoService.Eliminar).toHaveBeenCalledWith(id);
    expect(component.fnListarTodos).toHaveBeenCalled();
    expect(component.fnCancelarEliminar).toHaveBeenCalled();
  });
});
