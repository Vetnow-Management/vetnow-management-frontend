import { Injectable, OnInit } from '@angular/core';
import { ITutor } from '../_model/ITutor';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { stringify } from 'query-string';
import { ITipoPessoa } from '../../_model/ITipoPessoa';

@Injectable({
  providedIn: 'root',
})
export class TutorService implements OnInit {
  @BlockUI() blockUi!: NgBlockUI;
  tutorDetalhe: ITutor = { contato: {}, endereco: {} };

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {}

  buscar(id: string): Observable<ITutor> {
    this.blockUi.start();
    return this.httpClient.get(`${environment.BASE_URL_API}/pessoas/${id}`).pipe(finalize(() => this.blockUi.stop()));
  }

  pesquisar(tamanho = 10, pagina = 0): Observable<any> {
    this.blockUi.start();
    const query = stringify(
      { tamanho: tamanho, pagina: pagina, tipoPessoa: ITipoPessoa.TUTOR },
      {
        skipEmptyString: true,
        skipNull: true,
      }
    );
    return this.httpClient
      .get(`${environment.BASE_URL_API}/pessoas?${query}`)
      .pipe(finalize(() => this.blockUi.stop()));
  }

  desativar(id?: string): Observable<ITutor> {
    this.blockUi.start();
    return this.httpClient
      .patch(`${environment.BASE_URL_API}/pessoas/${id}`, {})
      .pipe(finalize(() => this.blockUi.stop()));
  }

  salvar(tutor: ITutor): Observable<ITutor> {
    this.blockUi.start();
    return this.httpClient.post(`${environment.BASE_URL_API}/pessoas`, tutor).pipe(finalize(() => this.blockUi.stop()));
  }

  atualizar(id: string, tutor: ITutor): Observable<ITutor> {
    this.blockUi.start();
    return this.httpClient
      .put(`${environment.BASE_URL_API}/pessoas/${id}`, tutor)
      .pipe(finalize(() => this.blockUi.stop()));
  }
}
