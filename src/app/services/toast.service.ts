import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private messageService: MessageService) {}

  success(title: string, detalhe: string) {
    this.show(ToastTypes.SUCCESS, title, detalhe);
  }

  info(title: string, detalhe: string) {
    this.show(ToastTypes.INFO, title, detalhe);
  }

  warn(title: string, detalhe: string) {
    this.show(ToastTypes.WARN, title, detalhe);
  }

  error(title: string, detalhe: string) {
    this.show(ToastTypes.ERROR, title, detalhe);
  }

  private show(type: ToastTypes, title: string, detalhe: string) {
    this.messageService.add({ severity: type, summary: title, detail: detalhe });
  }
}

enum ToastTypes {
  SUCCESS = 'success',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
}
