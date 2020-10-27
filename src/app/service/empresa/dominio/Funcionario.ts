import { Pessoa } from '../../pessoa';
import InformacaoTrabalhista from './InformacaoTrabalhista';

export default interface Funcionario extends Pessoa {
  informacaoTrabalhista?: InformacaoTrabalhista;
}
