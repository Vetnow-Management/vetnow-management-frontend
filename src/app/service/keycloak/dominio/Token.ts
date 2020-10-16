export default interface Token {
  jwt: string;
  expiresIn: Date;
  tokenType: string;
}
