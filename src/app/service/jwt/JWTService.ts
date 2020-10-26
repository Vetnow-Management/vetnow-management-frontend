import { isAfter } from 'date-fns';
import jwtDecode from 'jwt-decode';

import { Token } from '../keycloak/dominio';
import { LocalStorageChaves, LocalStorageService } from '../local-storage';

class JWTService {
  public decriptar = <T>(token: string): T => {
    return jwtDecode(token);
  }

  public isAuthorizationJWTValid = (): boolean => {
    return LocalStorageService.obter<Token>(LocalStorageChaves.TOKEN)
      .map(({ expiresIn, jwt }) => this.validarToken(expiresIn, jwt))
      .orElse(false);
  }

  private validarToken = (dataExpiracao: Date, jwt: string): boolean => {
    try {
      const dataAtual = new Date();
      this.decriptar(jwt);
      return isAfter(dataExpiracao, dataAtual)
    } catch (err) {
      return false;
    }
  }
}

export default new JWTService();
