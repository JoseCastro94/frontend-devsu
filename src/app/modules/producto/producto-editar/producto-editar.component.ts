import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/core/models/producto';
import { DataService } from 'src/app/core/services/data.service';
import { ProductoService } from 'src/app/core/services/producto.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-producto-editar',
  templateUrl: './producto-editar.component.html',
  styleUrls: ['./producto-editar.component.css']
})
export class ProductoEditarComponent implements OnInit{
  productos: Producto [] = [];
  producto: Producto = new Producto();
  minFechaRevision: string = '';

  constructor(private productoService: ProductoService,
    private router: Router,
    private routerAct: ActivatedRoute,
    private dataService: DataService,
    private toast: ToastService
  ) { }

  ngOnInit(): void {
    this.routerAct.params.subscribe((params: any) => {
      this.fnBuscarProducto(params.id);
    });
  }

  fnBuscarProducto(id: string){
    let encontro = false;
    this.productos = this.dataService.getData() || [];

    for(const item of this.productos){
      if(item.id == id){
        this.producto = Object.assign({}, item);
        this.producto.date_release = item.date_release? item.date_release.toString().split('T')[0] : undefined;
        this.producto.date_revision = item.date_revision? item.date_revision.toString().split('T')[0] : undefined;
        encontro = true;
        break;
      }
    }

    if(!encontro){
      this.router.navigate(['/listar']);
    }
  }

  fnGuardar(myForm: NgForm){
    this.productoService.EditarDatos(this.producto).subscribe({
      next: (data) =>{
        this.toast.success('Producto editado.');
        this.router.navigate(['/listar']);
      },error: (e) =>{
        this.toast.error('Ups! No se pudo editar producto.');
        console.log(e);
      }
    })
  }

  fnValidarFechaLiberacion(form: NgForm) {
    const fechaLiberacion: Date = new Date(form.value.fechaLiberacion);
    const fechaActual = new Date();

    if (fechaLiberacion < fechaActual) {
      form.controls['fechaLiberacion'].setErrors({'fechaInvalida': true });
    } else {
      form.controls['fechaLiberacion'].setErrors(null);
    }
    this.minFechaRevision = this.fnCalcularFechaMinimaRevision(fechaLiberacion);
  }

  fnValidarFechaRevision(form: NgForm) {
    const fechaRevisión: Date = new Date(form.value.fechaRevision);
    const fechaLiberacion: Date = new Date(form.value.fechaLiberacion);
    const fechaActual = new Date();

    if (fechaRevisión < fechaLiberacion) {
      form.controls['fechaRevision'].setErrors({'min': true });
    } else if (fechaRevisión < fechaActual) {
      form.controls['fechaRevision'].setErrors({'min': true });
     } else {
      form.controls['fechaRevision'].setErrors(null);
    }
  }

  fnCalcularFechaMinimaRevision(fechaLiberacion: Date) {
    const fechaMinimaRevision = new Date(fechaLiberacion);
    fechaMinimaRevision.setFullYear(fechaMinimaRevision.getFullYear() + 1);
    const formattedDate = fechaMinimaRevision.toISOString().split('T')[0];
    return formattedDate;
  }
}
