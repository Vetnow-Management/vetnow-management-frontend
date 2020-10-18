import {Observable} from "rxjs";
import AbstractRestService from '../AbstractRestService';


class ValidacaoRestService extends AbstractRestService {

  public constructor() {
    super('validacao');
  }

  public validarToken(token: string): Observable<void> {
    return this.get('/token/' + token);
  }

}

export default new ValidacaoRestService();
