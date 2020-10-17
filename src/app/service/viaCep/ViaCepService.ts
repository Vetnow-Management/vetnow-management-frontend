import { Observable } from 'rxjs';

import { Sanitizer } from '@vetnow-management/essentials';

import { ViaCep } from './dominio';
import { AbstractRestService } from '../AbstractRestService';
import { Environment } from '../../util';

class ViaCepRestService extends AbstractRestService {
  public constructor() {
    super('ws', Environment.VIA_CEP_URL);
  }

  public buscarCEP(cep: string): Observable<ViaCep> {
    const cepSanitized = Sanitizer.cep(cep);
    return this.get<ViaCep>(`/${cepSanitized}/json/`);
  }
}

export default new ViaCepRestService();
