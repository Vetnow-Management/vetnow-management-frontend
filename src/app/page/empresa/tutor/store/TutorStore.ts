import {action, makeAutoObservable, observable} from "mobx";
import Cliente, {Page} from "../../../../service/pessoa/dominio/Cliente";

const PAGE_INITIAL: Page<Cliente> = {
  lista: [],
  pagina: 0,
  quantidade: 10,
  totalPagina: 0
}

export default class TutorStore {

  public cliente?: Cliente;
  public paginaCliente: Page<Cliente> = PAGE_INITIAL;

  public constructor() {
    makeAutoObservable(this, {
      cliente: observable,
      paginaCliente: observable,
      adicionarCliente: action.bound,
      adicionarClientesAtuais: action.bound
    });
  }

  public adicionarCliente = (cliente: Cliente): void => {
    this.cliente = cliente;
  }

  public adicionarClientesAtuais(pagina: Page<Cliente>): void {
    this.paginaCliente = pagina;
  }

  public limpar(): void {
    this.cliente = {};
    this.paginaCliente = PAGE_INITIAL;
  }

}
