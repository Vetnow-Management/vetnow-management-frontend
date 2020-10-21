export default interface Token {
  jwt: string;
  refreshJWT: string;
  expiresIn: Date;
  tokenType: string;
}
