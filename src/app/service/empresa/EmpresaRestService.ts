import { Observable } from 'rxjs';

import { Empresa } from './dominio';
import { HandleDates } from '../../util/decorators';
import { AbstractRestService } from '../AbstractRestService';

class EmpresaRestService extends AbstractRestService {
  public constructor() {
    super('empresa');
  }

  @HandleDates()
  public obter(query: { email?: string, username?: string }): Observable<Empresa> {
    const url = this.createUrlWithQueryParams(
      '/pessoa',
      query
    );
    return this.get<Empresa>(url);
  }
}

export default new EmpresaRestService();
