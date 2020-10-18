import queryString from 'querystring';
import { addSeconds } from 'date-fns';

import { AbstractRestService } from '../AbstractRestService';
import { Environment } from '../../util';
import { map } from 'rxjs/operators';
import { Token } from './dominio';
import { Observable } from 'rxjs';

class KeycloakRestService extends AbstractRestService {
  public constructor() {
    super('auth', Environment.KEYCLOAK_URL);
  }

  public obterToken(senha: string, usuario: string): Observable<Token> {
    const body = {
      client_id: 'vetnow-management-client',
      grant_type: 'password',
      username: usuario,
      password: senha,
    };
    const url = `${ this.BASE_URL }/realms/vetnow-management/protocol/openid-connect/token`;

    return this.getResponseBody(
      this.HTTP_CLIENT.post<LoginResponse>(
        url,
        queryString.stringify(body),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      ),
    ).pipe(map(this.mapToToken));
  }

  private mapToToken = (value: LoginResponse): Token => {
    const currentDate = new Date();
    const {
      expires_in,
      access_token,
      token_type,
      refresh_token,
    } = value;

    return {
      jwt: access_token,
      refreshJWT: refresh_token,
      expiresIn: addSeconds(currentDate, expires_in),
      tokenType: token_type,
    };
  }
}

type LoginResponse = {
  access_token: string
  expires_in: number,
  refresh_expires_in: number,
  refresh_token: string
  token_type: string,
  'not-before-policy': number,
  session_state: string,
  scope: string
};

export default new KeycloakRestService();
