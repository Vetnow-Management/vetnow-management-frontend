import Recuperacao from './Recuperacao';

export default interface TokenRecuperacaoInterface {
  recuperacao: Recuperacao;
  exp: number;
  iat: number;
}
