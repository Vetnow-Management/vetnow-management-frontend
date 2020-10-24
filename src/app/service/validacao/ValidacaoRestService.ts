import {AbstractRestService} from "../AbstractRestService";
import {Observable} from "rxjs";
import ICadastroValidacao from "./domain/ICadastroValidacao";
import IValidacaoQuery from "./domain/ValidacaoQuery";

class ValidacaoRestService extends AbstractRestService {

  public constructor() {
    super('validacao');
  }

  public validarInformacoes(validacao: IValidacaoQuery): Observable<ICadastroValidacao> {
    return this.get(this.createUrlWithQueryParams('/informacoes', validacao));
  }

  public validarToken(token: string): Observable<void> {
    return this.get('/token/' + token);
  }

}

export default new ValidacaoRestService();
