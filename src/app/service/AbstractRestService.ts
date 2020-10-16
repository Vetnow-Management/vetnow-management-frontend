import AbstractResource from '@vetnow-management/essentials/dist/http/AbstractResource';

import { Environment } from '../util';

export abstract class AbstractRestService extends AbstractResource {
  protected constructor(
    private readonly resourceEndpoint: string,
    private readonly dominioURL?: string,
    ) {
    // todo: Adicionar os interceptors no futuro
    super(dominioURL ?? Environment.API_URL, resourceEndpoint);
  }
}
