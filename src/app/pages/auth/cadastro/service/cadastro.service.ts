import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { Empresa } from '../model/Empresa';
import { EmpresaNovo } from '../model/EmpresaNovo';

@Injectable({
  providedIn: 'root',
})
export class CadastroService {
  constructor(private httpClient: HttpClient) {}

  cadastrar(empresa: EmpresaNovo): Observable<Empresa> {
    return this.httpClient.post(environment.BASE_URL_API + '/empresas', empresa);
  }
}
