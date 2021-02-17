import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../_services/authentication.service';

interface IUrls {
  descricao: string;
  url: string;
}

const WITHOUT_HEADERS: IUrls[] = [
  {
    descricao: 'Via CEP',
    url: 'https://viacep.com.br/ws',
  },
];

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isTrue = WITHOUT_HEADERS.find((value) => request.url.startsWith(value.url));
    if (!!isTrue) return next.handle(request);
    request = this.addHeaderToken(request);
    request = this.addHeaderEmpresa(request);
    return next.handle(request);
  }

  private addHeaderToken(request: HttpRequest<any>): HttpRequest<any> {
    const currentUserValue = this.authenticationService.currentUserValue;
    if (currentUserValue && currentUserValue?.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUserValue.token}`,
        },
      });
    }
    return request;
  }

  private addHeaderEmpresa(request: HttpRequest<any>): HttpRequest<any> {
    const currentEmpresaValue = this.authenticationService.currentEmpresaValue;
    if (currentEmpresaValue) {
      request = request.clone({
        setHeaders: {
          empresa: `${currentEmpresaValue.id as string}`,
        },
      });
    }
    return request;
  }
}
