import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './model/user';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { EmpresaService } from './empresa.service';
import { IEmpresaFiltro } from './model/IEmpresaFiltro';
import { Page } from './model/Page';
import { IEmpresa } from '../pages/auth/cadastro/_model/IEmpresa';
import { isNotNullOrUndefined } from 'codelyzer/util/isNotNullOrUndefined';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public currentUser: Observable<User>;
  public currentEmpresa: Observable<IEmpresa>;
  private currentUserSubject: BehaviorSubject<User>;
  private currentEmpresaSubject: BehaviorSubject<IEmpresa>;
  public isLogado = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private empresaService: EmpresaService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser') as string));
    this.currentEmpresaSubject = new BehaviorSubject<IEmpresa>(
      JSON.parse(localStorage.getItem('currentEmpresa') as string)
    );
    this.currentUser = this.currentUserSubject.asObservable();
    this.currentEmpresa = this.currentEmpresaSubject.asObservable();
  }

  get isLoggedIn() {
    return this.isLogado.asObservable(); // {2}
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public get currentEmpresaValue(): IEmpresa {
    return this.currentEmpresaSubject.value;
  }

  buscarEmpresa(): void {
    const { usuario } = this.currentUserSubject.value;
    const filtro: IEmpresaFiltro = { usuario };
    this.empresaService.pesquisar(filtro, 0, 1).subscribe((pagina: Page<IEmpresa>) => {
      const empresa = pagina.lista!.find(isNotNullOrUndefined) as IEmpresa;
      if (!empresa) this.isLogado.next(false);
      localStorage.setItem('currentEmpresa', JSON.stringify(empresa));
      this.currentEmpresaSubject.next(empresa);
    });
  }

  login(usuario: string, senha: string): Observable<User> {
    return this.http
      .post<User>(`${environment.BASE_URL_API}/login`, { usuario, senha })
      .pipe(
        map((user: User) => {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          this.buscarEmpresa();
          return user;
        })
      );
  }

  logout() {
    this.isLogado.next(false);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentEmpresa');
    this.currentUserSubject.next({});
  }
}
