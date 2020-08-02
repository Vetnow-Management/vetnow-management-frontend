import { Observable } from 'rxjs';

import { AbstractService } from '.';
import { ViaCep } from '../Type';

class ViaCepService extends AbstractService {
  public constructor() {
    super('');
  }

  public buscarCEP(cep: string): Observable<ViaCep> {
    return this.getResponseBody<ViaCep>(
      this.HTTP_CLIENT.get<ViaCep>(`https://viacep.com.br/ws/${cep}/json/`),
    );
  }
}

export default new ViaCepService();
