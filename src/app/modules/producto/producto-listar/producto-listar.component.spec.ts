import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductoListarComponent } from './producto-listar.component';
import { Producto } from 'src/app/core/models/producto';
import { ProductoService } from 'src/app/core/services/producto.service';
import { of, throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastService } from 'src/app/core/services/toast.service';
import { DataService } from 'src/app/core/services/data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FiltroPipe } from 'src/app/core/pipes/filtroPipe';
import { Router } from '@angular/router';

describe('ProductoListarComponent', () => {
  let component: ProductoListarComponent;
  let fixture: ComponentFixture<ProductoListarComponent>;
  let productoService: ProductoService;
  let toastService: ToastService;
  let router: Router;

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
      providers: [DataService, ToastService, ProductoService,ToastService],
    }).compileComponents();

    productoService = TestBed.inject(ProductoService);
    fixture = TestBed.createComponent(ProductoListarComponent);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    toastService = TestBed.inject(ToastService);
    fixture.detectChanges();
  });

  it('Creacion componente listar producto', () => {
    expect(component).toBeTruthy();
  });

  it('Lista productos', () => {
    spyOn(productoService, 'ListarTodos').and.returnValue(of(productos));
    component.ngOnInit();
    expect(component.productos.length).toBe(productos.length);
  });

  it('Producto eliminar', () => {
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

  it('Navegar a la página de edición en fnEditar', () => {
    const producto = {
      id: 'P001',
      name: 'Producto 1',
      description: 'Descripción 1',
      date_release: '2023-01-12',
      date_revision: '2024-02-12',
      logo: 'logo1.jpg',
    };

    spyOn(router, 'navigateByUrl').and.stub();
    component.fnEditar(producto);
    expect(router.navigateByUrl).toHaveBeenCalledWith(`/editar/${producto.id}`, { skipLocationChange: false });
  });

  it('Manejar el error de carga de imágenes', () => {
    const event = { target: { src: '' } };
    component.fnHandleImageError(event);
    expect(event.target.src).toBe('assets/img/img_not_found.jpg');
  });

  it('Confirmar y eliminar el producto', () => {
    const item: Producto = { id: 'P001', name: 'Producto 1', description: 'Descripción 1', date_release: '2023-01-12', date_revision: '2024-02-12', logo: 'logo1.jpg' };
    spyOn(productoService, 'Eliminar').and.returnValue(of(null));
    component.fnEliminar(item);
    component.fnConfirmarEliminar();
    expect(productoService.Eliminar).toHaveBeenCalledWith(item.id);
  });

  it('Aumentar el número de página en nextPage()', () => {
    component.page = 0;
    component.nRegistro = 5;
    component.nextPage();
    expect(component.page).toBe(5);
  });

  it('Dosminuir el número de página en nextPage()', () => {
    component.page = 10;
    component.nRegistro = 5;
    component.prevPage();
    expect(component.page).toBe(5);
  });

  it('Establecer el término de búsqueda y restablecer el número de página en onSearch()', () => {
    component.page = 10;
    component.search = '';
    component.onSearch('keyword');
    expect(component.page).toBe(0);
    expect(component.search).toBe('keyword');
  });

  it('Manejar el error 404 al eliminar el producto', () => {
    const producto: Producto = { id: 'P001', name: 'Producto 1', description: 'Descripción 1', date_release: '2023-01-12', date_revision: '2024-02-12', logo: 'logo1.jpg' };

    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(productoService, 'Eliminar').and.returnValue(throwError({ status: 404 }));
    spyOn(component, 'fnListarTodos');
    spyOn(component, 'fnCancelarEliminar');
    const toastInfoSpy = spyOn(toastService, 'info');

    component.fnEliminar(producto);
    component.fnConfirmarEliminar();

    expect(component.fnListarTodos).not.toHaveBeenCalled();
    expect(component.fnCancelarEliminar).not.toHaveBeenCalled();
    expect(toastInfoSpy).toHaveBeenCalledWith('Ups! No se pudo encontro producto.');
  });

});
