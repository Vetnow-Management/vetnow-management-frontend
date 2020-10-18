import {Observable} from "rxjs";
import AbstractRestService from '../AbstractRestService';


class UsuarioRestService extends AbstractRestService {

  public constructor() {
    super('usuario');
  }

  public solicitarAlteracaoSenha(email: string): Observable<void> {
    return this.get(`/senha/alterar/${email}/solicitar`);
  }

  public alterarSenha(usuario: { usuario: string, senha: string }): Observable<void> {
    return this.put(usuario, '/senha/alterar');
  }
}

export default new UsuarioRestService();
