import { Observable } from 'rxjs';

import { Sanitizer } from '@vetnow-management/essentials';

import { ViaCep } from './dominio';
import { Environment } from '../../util';
import AbstractRestService from '../AbstractRestService';

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
