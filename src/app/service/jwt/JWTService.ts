import {Observable, of} from "rxjs";
import jwtDecode from "jwt-decode";

class JWTService {

  public descriptar(token: string): Observable<TokenRecuperacaoInterface> {
    return of(jwtDecode(token));
  }

}

export interface Recuperacao {
  usuario: string;
  emailRecuperacao: string;
}

export interface TokenRecuperacaoInterface {
  recuperacao: Recuperacao;
  exp: number;
  iat: number;
}

export default new JWTService();
