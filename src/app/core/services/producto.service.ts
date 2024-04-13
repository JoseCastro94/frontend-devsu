import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  url: string = environment.baseUrl + 'products';

  constructor(private http: HttpClient) { }

  ListarTodos() {
    return this.http.get<Producto[]>(this.url);
  }

  GuardarDatos(obj: Producto): Observable<any> {
    return this.http.post(this.url, obj);
  }

  EditarDatos(obj: Producto): Observable<any> {
    return this.http.put(this.url, obj);
  }

  Eliminar(id: string): Observable<any>{
    console.dir(this.url + '?id=' + id);
    return this.http.delete(this.url + '?id=' + id);
  }

  Verificacion(id?: string): Observable<any>{
    return this.http.get<boolean>(this.url + '/verification?id=' + id);
  }
}
