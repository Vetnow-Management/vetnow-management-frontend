import { HttpStatus } from '@vetnow-management/essentials';

export default interface RespostaErro {
  erro: string;
  mensagem: string;
  status: HttpStatus;
}
