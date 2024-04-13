import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Producto } from 'src/app/core/models/producto';
import { ProductoService } from 'src/app/core/services/producto.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-producto-registrar',
  templateUrl: './producto-registrar.component.html',
  styleUrls: ['./producto-registrar.component.css']
})
export class ProductoRegistrarComponent implements OnInit{
  producto: Producto = new Producto();
  minFechaRevision: string = '';
  isLoading: boolean = false;

  constructor(private productoService: ProductoService,
    private router: Router,
    private toast: ToastService
  ) { }

  ngOnInit(): void {
  }

  fnGuardar(myForm: NgForm){
    this.isLoading = true;
    this.productoService.GuardarDatos(this.producto).pipe(
      finalize(() => {
        this.isLoading = false;
      })
    ).subscribe({
      next: (data) =>{
        this.toast.success('Producto registrado.');
        this.router.navigate(['/listar']);
      },error: (e) =>{
        this.toast.error('Ups! No se pudo registrar producto.');
        console.log(e);
      }
    })
  }

  fnVerificarGuardar(myForm: NgForm){
    this.productoService.Verificacion(this.producto.id).subscribe({
      next: (data) =>{
        if(data == false){
          this.fnGuardar(myForm);
        }else{
          this.toast.info('El id del producto ya existe!');
        }
      },error: (e) =>{
        this.toast.error('No se pudo verificar producto.');
        console.log(e);
      }
    })
  }

  fnValidarFechaLiberacion(form: NgForm) {
    const fechaLiberacion: Date = new Date(form.value.fechaLiberacion);
    const fechaActual = new Date();
    fechaActual.setDate(fechaActual.getDate() - 1);

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
