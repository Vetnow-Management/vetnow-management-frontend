import type Usuario from './Usuario';
import type Endereco from './Endereco';
import type Contato from './Contato';
import type Empresa from './Empresa';

export default interface Cadastro {
  nome?: string;
  dtNascimento?: string;
  documento?: string;
  tipoPessoa?: string;
  usuario?: Usuario;
  endereco?: Endereco;
  contato?: Contato;
  empresa?: Empresa;
}
