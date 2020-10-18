import HttpStatus from '@vetnow-management/essentials/dist/types/HttpStatus';

export default interface RespostaErro {
  erro: string;
  mensagem: string;
  status: HttpStatus;
}
