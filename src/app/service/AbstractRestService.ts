import AbstractResource from '@vetnow-management/essentials/dist/http/AbstractResource';

import { Environment } from '../util';
import { onBadRequestResponse, addAuthorization } from '../config/Interceptors';

export abstract class AbstractRestService extends AbstractResource {
  protected constructor(
    private readonly resourceEndpoint: string,
    private readonly dominioURL?: string,
    ) {
    super(
      dominioURL ?? Environment.API_URL,
      resourceEndpoint,
      {
        interceptors: {
          request: {
            onFulfilled: [
              addAuthorization,
            ],
          },
          response: {
            onRejected: [
              onBadRequestResponse,
            ],
          },
        },
      },
    );
  }
}
