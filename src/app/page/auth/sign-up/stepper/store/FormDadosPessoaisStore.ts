import { observable } from 'mobx';
import applyMixins from '../../../../../util/ApplyMixins';
import { FormStoreHelperMixin } from '../../../../../mixin';

class FormDadosPessoaisStore {
  public readonly TAMANHO_NOME: number = 10;

  @observable
  public nome: string = '';

  @observable
  public celular: string = '';

  @observable
  public cpf: string = '';
}

interface FormDadosPessoaisStore extends FormStoreHelperMixin {}
applyMixins(FormDadosPessoaisStore, FormStoreHelperMixin);

export default FormDadosPessoaisStore
