import { Observable } from 'rxjs';

import { Cadastro } from './dominio';
import { HandleDates } from '../../util';
import { AbstractRestService } from '../AbstractRestService';

class PessoaRestService extends AbstractRestService {
  public constructor() {
    super('pessoa');
  }

  @HandleDates()
  public cadastrarResponsavel(payload: Cadastro): Observable<any> {
    return this.post({
      ...payload,
      tipoPessoa: 'RESPONSAVEL',
      usuario: {
        ...payload.usuario,
        perfil: 'ADMINISTRADOR',
      }
    });
  }
}

export default new PessoaRestService();
