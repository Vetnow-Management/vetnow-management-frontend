import Contato from './Contato';
import Endereco from './Endereco';
import { TipoPessoa } from './enum';
import { Empresa } from '../../empresa';
import { Usuario } from '../../usuario';

export default interface Pessoa {
  uuid?: string;
  nome?: string;
  dtNascimento?: Date;
  documento?: string;
  tipoPessoa?: TipoPessoa;
  usuario?: Usuario;
  endereco?: Endereco;
  contato?: Contato;
  empresa?: Empresa;
}
