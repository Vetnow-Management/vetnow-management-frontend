import { Pessoa } from '../../pessoa/dominio';

export default interface Usuario {
  id?: number;
  usuario?: string;
  senha?: string;
  email?: string;
  pessoa?: Pessoa;
}
