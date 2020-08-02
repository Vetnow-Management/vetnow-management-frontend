import { action, observable } from 'mobx';

import { ContatoStore, EmpresaStore, EnderecoStore, UsuarioStore } from './index';
import FormStoreHelperMixin from '../../../../mixin/FormStoreHelperMixin';
import applyMixins from '../../../../util/ApplyMixins';

class FormCadastroStore {
  public readonly TAMANHO_NOME: number = 10;

  @observable
  public nome: string = '';

  @observable
  public dtNascimento: string = '';

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

  public constructor(
    // private readonly _usuario: UsuarioStore,
    // private readonly _endereco: EnderecoStore,
    // private readonly _contato: ContatoStore,
    // private readonly _empresa: EmpresaStore,
  ) {
    // this.usuario = _usuario;
    // this.endereco = _endereco;
    // this.contato = _contato;
    // this.empresa = _empresa;

    this.usuario = new UsuarioStore();
    this.endereco = new EnderecoStore();
    this.contato = new ContatoStore();
    this.empresa = new EmpresaStore();
  }

  @action.bound
  public limparCampos(): void {
    this.nome = '';
    this.dtNascimento = '';
    this.documento = '';
  }
}

interface FormCadastroStore extends FormStoreHelperMixin{}
applyMixins(FormCadastroStore, FormStoreHelperMixin);
export default FormCadastroStore;
