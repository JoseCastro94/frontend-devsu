import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductoListarComponent } from './modules/producto/producto-listar/producto-listar.component';
import { ProductoRegistrarComponent } from './modules/producto/producto-registrar/producto-registrar.component';
import { ProductoEditarComponent } from './modules/producto/producto-editar/producto-editar.component';

const routes: Routes = [
  {path : 'listar' , component : ProductoListarComponent},
  {path : 'nuevo' , component : ProductoRegistrarComponent},
  {path : 'editar/:id' , component : ProductoEditarComponent },
  {path : '**', pathMatch: 'full' , redirectTo: 'listar' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
