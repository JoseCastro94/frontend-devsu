import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { ProductoListarComponent } from './modules/producto/producto-listar/producto-listar.component';
import { AuthorIdInterceptorService } from './core/interceptors/author-id-interceptor.service';
import { TituloComponent } from './shared/titulo/titulo.component';
import { ProductoRegistrarComponent } from './modules/producto/producto-registrar/producto-registrar.component';
import { ProductoEditarComponent } from './modules/producto/producto-editar/producto-editar.component';
import { LoadingInterceptorService } from './core/interceptors/loading-interceptor.service';
import { FormErrorMessageComponent } from './shared/form-error-message/form-error-message.component';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { CommonModule , DatePipe } from '@angular/common';
import { FiltroPipe } from './core/pipes/filtroPipe';
import { NgToastModule } from 'ng-angular-popup'

@NgModule({
  declarations: [
    AppComponent,
    ProductoListarComponent,
    LoadingComponent,
    TituloComponent,
    ProductoRegistrarComponent,
    ProductoEditarComponent,
    FormErrorMessageComponent,
    FiltroPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgToastModule
  ],
  exports:[
    FiltroPipe
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS ,
      useClass:LoadingInterceptorService ,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS ,
      useClass:AuthorIdInterceptorService ,
      multi: true
    },
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
