import { Observable } from 'rxjs';

import { AbstractService } from '.';
import { ViaCep } from '../domain';
import { Sanitizer } from '@vetnow-management/essentials';

class ViaCepService extends AbstractService {
  public constructor() {
    super('');
  }

  public buscarCEP(cep: string): Observable<ViaCep> {
    const cepSanitized = Sanitizer.cep(cep);

    return this.getResponseBody<ViaCep>(
      this.HTTP_CLIENT.get<ViaCep>(`https://viacep.com.br/ws/${cepSanitized}/json/`),
    );
  }
}

export default new ViaCepService();
