import { action, computed, observable } from 'mobx';

import { ContatoStore, EmpresaStore, EnderecoStore, UsuarioStore } from './index';
import FormStoreHelperMixin from '../../../../mixin/FormStoreHelperMixin';
import applyMixins from '../../../../util/ApplyMixins';
import { Func } from '@cade-tecnologia/essentials';

interface IError {
  field: string,
  errorMessage: string,
}
class FormCadastroStore {
  @observable
  private erros: IError[] = [];

  @observable
  public nome: string = '';

  @observable
  public dtNascimento: Date | null = null;

  @observable
  public documento: string = '';

  @observable
  public readonly tipoPessoa: string = 'FUNCIONARIO';

  @observable
  public readonly usuario: UsuarioStore

  @observable
  public readonly endereco: EnderecoStore;

  @observable
  public readonly contato: ContatoStore;

  @observable
  public readonly empresa: EmpresaStore;

  public constructor() {
    this.usuario = new UsuarioStore();
    this.endereco = new EnderecoStore();
    this.contato = new ContatoStore();
    this.empresa = new EmpresaStore();
  }

  @action.bound
  public setDtNascimento(date: Date | null) {
    this.dtNascimento = date;
  }

  @action.bound
  public limparCampos(): void {
    this.nome = '';
    this.dtNascimento = null;
    this.documento = '';
  }

  @computed
  public get erro(): Func<string, string | null | undefined> {
    return (field: string) => {
      return this.erros
        .find((err) => err.field === field)
        ?.errorMessage
    };
  }

  @action.bound
  public setErro(err: IError): void {
    this.erros.push(err);
  }

  @action.bound
  public removeErro(field: string): void {
    this.erros = this.erros.filter((err) => err.field !== field);
  }
}

interface FormCadastroStore extends FormStoreHelperMixin{}
applyMixins(FormCadastroStore, FormStoreHelperMixin);
export default FormCadastroStore;
