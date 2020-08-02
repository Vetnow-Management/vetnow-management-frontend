import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { AbstractService } from '.';

class UtilsService extends AbstractService {
  public constructor() {
    super('/utils');
  }

  public validarChaveAcesso(chave: string): Observable<boolean> {
    return of<boolean>(true).pipe(delay(1000)); //fixme: Remover mock
  }
}

export default new UtilsService();
