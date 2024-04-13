import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from 'src/app/core/models/producto';
import { DataService } from 'src/app/core/services/data.service';
import { ProductoService } from 'src/app/core/services/producto.service';
import { ToastService } from 'src/app/core/services/toast.service';

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
    private dataService: DataService,
    private toast: ToastService
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
        this.toast.error('Ups! No se cargaron productos.');
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
          this.toast.success('Producto eliminado.');
        }else  if(e.status == 404){
          this.toast.info('Ups! No se pudo encontro producto.');
        }else{
          this.toast.error('Ups! No se pudo eliminar producto.');
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
