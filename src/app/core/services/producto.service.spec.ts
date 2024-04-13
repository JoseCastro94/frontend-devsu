import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductoService } from './producto.service';
import { Producto } from '../models/producto';

describe('ProductoService', () => {
  let productoService: ProductoService;
  let httpMock: HttpTestingController;

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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductoService]
    });

    productoService = TestBed.inject(ProductoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Creacion de Servicio', () => {
    expect(productoService).toBeTruthy();
  });

  it('Retorna lista de productos', () => {
    productoService.ListarTodos().subscribe(products => {
      expect(products.length).toBe(2);
      expect(products).toEqual(productos);
    });

    const req = httpMock.expectOne(`${productoService.url}`);
    expect(req.request.method).toBe('GET');
    req.flush(productos);
  });

  it('Guarda Producto', () => {
    const newProduct: Producto =   {
      id: 'P002',
      name: 'Producto 2',
      description: 'Descripción 2',
      date_release: '2023-02-11',
      date_revision: '2023-06-11',
      logo: 'logo2.jpg',
    };

    productoService.GuardarDatos(newProduct).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${productoService.url}`);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('Edita producto', () => {
    const updatedProduct: Producto =  {
      id: 'P002',
      name: 'Producto 2',
      description: 'Descripción 2',
      date_release: '2023-02-11',
      date_revision: '2023-06-11',
      logo: 'logo2.jpg',
    };

    productoService.EditarDatos(updatedProduct).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${productoService.url}`);
    expect(req.request.method).toBe('PUT');
    req.flush({});
  });

  it('Elimina producto', () => {
    const productId = '1';

    productoService.Eliminar(productId).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${productoService.url}?id=${productId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('Verifica producto', () => {
    const productId = '1';

    productoService.Verificacion(productId).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${productoService.url}/verification?id=${productId}`);
    expect(req.request.method).toBe('GET');
    req.flush(true);
  });

 });
