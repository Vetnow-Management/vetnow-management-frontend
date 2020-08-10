import { AbstractService } from '.';
import { ICadastro } from '../page/auth/sign-up/validation-schema';
import { Observable } from 'rxjs';

class CadastroService extends AbstractService {
  public constructor() {
    super('cadastro');
  }

  public cadastrarResponsavel(payload: ICadastro): Observable<any> {
    return this.post(payload, '/responsavel/novo')
  }
}

export default new CadastroService();
