import type Endereco from './Endereco';
import type Contato from './Contato';

export default interface Empresa {
  razaoSocial?: string;
  documento?: string;
  nitPisPasep?: string;
  dataAbertura?: string;
  endereco?: Endereco;
  contato?: Contato;
}
