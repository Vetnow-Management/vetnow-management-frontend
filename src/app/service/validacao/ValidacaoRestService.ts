import {Observable} from "rxjs";

import {AbstractRestService} from "../AbstractRestService";
import { ValidacaoQuery , ICadastroValidacao } from "./dominio";

class ValidacaoRestService extends AbstractRestService {
  public constructor() {
    super('validacao');
  }

  public validarInformacoes(validacao: ValidacaoQuery): Observable<ICadastroValidacao> {
    return this.get(this.createUrlWithQueryParams('/informacoes', validacao));
  }

  public validarToken(token: string): Observable<void> {
    return this.get('/token/' + token);
  }

}

export default new ValidacaoRestService();
