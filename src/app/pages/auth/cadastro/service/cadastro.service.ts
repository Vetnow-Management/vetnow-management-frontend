import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { IEmpresa } from '../_model/IEmpresa';
import { IEmpresaNovo } from '../_model/IEmpresaNovo';
import { IUsuario } from '../_model/IUsuario';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { finalize, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CadastroService {
  @BlockUI() blockUi!: NgBlockUI;
  constructor(private httpClient: HttpClient) {}

  cadastrar(empresa: IEmpresaNovo): Observable<IEmpresa> {
    this.blockUi.start();
    return this.httpClient.post(environment.BASE_URL_API + '/empresas', empresa).pipe(
      mergeMap(() => this.httpClient.post(environment.BASE_URL_API + '/usuarios', empresa.usuario)),
      finalize(() => this.blockUi.stop())
    );
  }

  cadastrarLogin(usuario: IUsuario): Observable<IEmpresa> {
    this.blockUi.start();
    return this.httpClient
      .post(environment.BASE_URL_API + '/usuarios', usuario)
      .pipe(finalize(() => this.blockUi.stop()));
  }
}
