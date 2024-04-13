import { Producto } from '../models/producto';
import { FiltroPipe } from './filtroPipe';

describe('FiltroPipe', () => {
  let pipe: FiltroPipe;
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
    pipe = new FiltroPipe();
  });

  it('Crear una instancia', () => {
    expect(pipe).toBeTruthy();
  });

  it('Filtrar por nombre', () => {
    const search = 'Producto 1';
    const result = pipe.transform(productos, 0, search);
    expect(result.length).toBe(1);
    expect(result[0].name).toContain(search);
  });

  it('Filtrar por descripcion', () => {
    const search = 'Descripción 2';
    const result = pipe.transform(productos, 0, search);
    expect(result.length).toBe(1);
    expect(result[0].description).toContain(search);
  });

  it('Devolver una lista vacía si no se encuentra ninguna coincidencia', () => {
    const search = 'Producto 4';
    const result = pipe.transform(productos, 0, search);
    expect(result.length).toBe(0);
  });

  it('Paginar datos', () => {
    const result = pipe.transform(productos, 0, '', 2);
    expect(result.length).toBe(2);
  });
});
