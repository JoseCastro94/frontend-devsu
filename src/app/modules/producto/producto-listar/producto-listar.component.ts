import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from 'src/app/core/models/producto';
import { DataService } from 'src/app/core/services/data.service';
import { ProductoService } from 'src/app/core/services/producto.service';

@Component({
  selector: 'app-producto-listar',
  templateUrl: './producto-listar.component.html',
  styleUrls: ['./producto-listar.component.css']
})
export class ProductoListarComponent implements OnInit{
  productos: Producto [] = [];
  producto: Producto = new Producto();
  page: number = 0;
  search: string = '';
  pagesArr: number[] = [5 , 10 , 20];
  nRegistro: number = this.pagesArr[0] || 5;

  constructor(private productoService: ProductoService,
    private router: Router,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.fnListarTodos();
  }

  fnEditar(item: Producto) {
    this.router.navigate(['/editar/' + item.id]);
  }

  fnListarTodos() {
    this.productoService.ListarTodos().subscribe({
      next: (data) =>{
        this.productos = data.map(item => ({ ...item, showMenu: false }));
        this.dataService.setData(this.productos);
      },error: (e) =>{
        alert('No se pudieron cargar datos de los productos.');
        console.log(e);
      }
    })
  }

  fnHandleImageError(event: any) {
    event.target.src = 'assets/img/img_not_found.jpg';
  }

  fnEliminar(item: Producto) {
    this.producto = Object.assign({}, item);

    const modal = document.getElementById('confEliminarModal');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  fnCancelarEliminar(){
    const modal = document.getElementById('confEliminarModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  fnConfirmarEliminar(){
    this.productoService.Eliminar(this.producto.id!).subscribe({
      next: (data) =>{
        this.fnListarTodos();
        this.fnCancelarEliminar();
      },error: (e) =>{
        if(e.status == 200){
          this.fnListarTodos();
          this.fnCancelarEliminar();
        }else  if(e.status == 404){
          alert('No se encontro producto.');
        }else{
          alert('No se pudo eliminar producto.');
        }
        console.log(e);
      }
    })
  }

  nextPage() {
    this.page += parseInt(this.nRegistro.toString());
  }

  prevPage() {
    if ( this.page > 0 )
      this.page -= parseInt(this.nRegistro.toString());
  }

  onSearch( search: string) {
    this.page = 0;
    this.search = search;
  }
}
