import { FormDadosEmpresariaisStore, FormDadosPessoaisStore, FormDadosPagamentosStore } from '.';

export default class FormCadastroStore {
  public readonly dadosPessoais: FormDadosPessoaisStore;
  public readonly dadosEmpresariais: FormDadosEmpresariaisStore;
  public readonly dadosPagamentos: FormDadosPagamentosStore;

  public constructor() {
    this.dadosPessoais = new FormDadosPessoaisStore();
    this.dadosEmpresariais = new FormDadosEmpresariaisStore();
    this.dadosPagamentos = new FormDadosPagamentosStore();
  }
}
