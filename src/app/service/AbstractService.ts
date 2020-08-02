import AbstractResource from '@cade-tecnologia/essentials/dist/http/AbstractResource';

import { Environment } from '../util';

export default abstract class AbstractService extends AbstractResource {
  protected constructor(private readonly resourceEndpoint: string) {
    // todo: Adicionar os interceptors no futuro
    super(Environment.API_URL, resourceEndpoint);
  }
}
