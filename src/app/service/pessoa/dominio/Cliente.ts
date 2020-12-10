import {Usuario} from "../../usuario/domain";
import {Empresa} from "../../empresa/dominio";
import Animal from "./Animal";
import {Contato, Endereco} from "./index";

export interface Page<T> {
  lista: T[],
  pagina: number,
  quantidade: number,
  totalPagina: number
}

export default interface Cliente {
  uuid?: string;
  nome?: string;
  dtNascimento?: string;
  documento?: string;
  tipoPessoa?: string;
  usuario?: Usuario;
  contato?: Contato;
  endereco?: Endereco;
  empresa?: Empresa;
  animais?: Animal[]
}
