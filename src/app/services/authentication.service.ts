import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../model/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public currentUser: Observable<User>;
  private currentUserSubject: BehaviorSubject<User>;
  public isLogado = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser') as string));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  get isLoggedIn() {
    return this.isLogado.asObservable(); // {2}
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string): User {
    const user: User = {
      id: 1,
      usuario: 'teste',
      senha: 'teste123',
      token: 'ksjhdksjhdjkasdhskabdjasbdkj',
    };

    // this.isLogado.next(true);
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);

    return user;

    // todo realizar chamada de login no servico
    // return this.http
    //   .post<User>(`${environment.BASE_URL_API}/login`, { username, password })
    //   .pipe(
    //     map((user: User) => {
    //       // store user details and jwt token in local storage to keep user logged in between page refreshes
    //       localStorage.setItem('currentUser', JSON.stringify(user));
    //       this.currentUserSubject.next(user);
    //       return user;
    //     })
    //   );
  }

  logout() {
    this.isLogado.next(false);
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next({});
  }
}
