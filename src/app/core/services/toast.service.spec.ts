import { TestBed, inject } from '@angular/core/testing';
import { NgToastService } from 'ng-angular-popup';
import { ToastService } from './toast.service';

describe('ToastService', () => {
  let toastService: ToastService;
  let ngToastServiceSpy: jasmine.SpyObj<NgToastService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('NgToastService', ['success', 'error', 'info', 'warning']);

    TestBed.configureTestingModule({
      providers: [
        ToastService,
        { provide: NgToastService, useValue: spy }
      ]
    });

    toastService = TestBed.inject(ToastService);
    ngToastServiceSpy = TestBed.inject(NgToastService) as jasmine.SpyObj<NgToastService>;
  });

  it('Creacion ToastService', () => {
    expect(toastService).toBeTruthy();
  });

  it('Llamada al metodo success del ToastService', () => {
    const message = 'Success message';
    toastService.success(message);
    expect(ngToastServiceSpy.success).toHaveBeenCalledWith({ detail: '¡Exito!', summary: message, duration: 5000 });
  });

  it('Llamada al metodo error del ToastService', () => {
    const message = 'Error message';
    toastService.error(message);
    expect(ngToastServiceSpy.error).toHaveBeenCalledWith({ detail: 'Error!', summary: message, duration: 5000 });
  });

  it('Llamada al metodo info del ToastService', () => {
    const message = 'Info message';
    toastService.info(message);
    expect(ngToastServiceSpy.info).toHaveBeenCalledWith({ detail: '¡Aviso!', summary: message, duration: 5000 });
  });

  it('Llamada al metodo warning del ToastService', () => {
    const message = 'Warning message';
    toastService.warning(message);
    expect(ngToastServiceSpy.warning).toHaveBeenCalledWith({ detail: '¡Advertencia!', summary: message, duration: 5000 });
  });
});
