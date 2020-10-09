import { AbstractService } from '../index';
import { Observable } from 'rxjs';
import { Cadastro } from './dominio';

class CadastroRestService extends AbstractService {
  public constructor() {
    super('cadastro');
  }

  public cadastrarResponsavel(payload: Cadastro): Observable<any> {
    return this.post(payload, '/novo')
  }
}

export default new CadastroRestService();
