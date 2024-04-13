import { NgToastService } from 'ng-angular-popup';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toast: NgToastService) { }

  success(msg: string){
    this.toast.success({detail:"¡Exito!",summary:msg, duration: 5000 });
  }
  error(msg: string){
    this.toast.error({detail:"Error!",summary:msg, duration: 5000});
  }
  info(msg: string){
    this.toast.info({detail:"¡Aviso!",summary:msg, duration: 5000});
  }
  warning(msg: string){
    this.toast.warning({detail:"¡Advertencia!",summary:msg, duration: 5000});
  }
}
