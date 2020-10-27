import Chave from './Chave';
import { Endereco, Pessoa, Contato } from '../../pessoa';

export default interface Empresa {
  uuid?: string;
  razaoSocial?: string;
  documento?: string;
  nitPisPasep?: string;
  dataAbertura?: Date;
  endereco?: Endereco;
  contato?: Contato;
  chave?: Chave;
  pessoas?: Pessoa[];
}
