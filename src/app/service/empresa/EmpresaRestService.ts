import { Observable } from 'rxjs';

import { Empresa } from './dominio';
import { HandleDates } from '../../util/decorators';
import { AbstractRestService } from '../AbstractRestService';

class EmpresaRestService extends AbstractRestService {
  public constructor() {
    super('empresa');
  }

  @HandleDates()
  public obter(login: string): Observable<Empresa> {
    return this.get<Empresa>(`/pessoa/${login}`)
  }
}

export default new EmpresaRestService();
