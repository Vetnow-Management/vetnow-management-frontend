import type Contato from './Contato';
import type Endereco from './Endereco';
import type { Empresa } from '../../empresa';
import type { Usuario } from '../../usuario';

export default interface Cadastro {
  nome?: string;
  dtNascimento?: Date;
  documento?: string;
  tipoPessoa?: string;
  usuario?: Usuario;
  endereco?: Endereco;
  contato?: Contato;
  empresa?: Empresa;
}
