import Funcionario from './Funcionario';

export default interface InformacaoTrabalhista {
  id: number;
  documentoTituloEleitor: string;
  inscricaoPisPasep: string;
  funcionario: Funcionario;
}
