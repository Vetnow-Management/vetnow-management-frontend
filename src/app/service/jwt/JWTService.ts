import jwtDecode from 'jwt-decode';

class JWTService {
  public decriptar = <T>(token: string): T => {
    return jwtDecode(token);
  }
}

export default new JWTService();
