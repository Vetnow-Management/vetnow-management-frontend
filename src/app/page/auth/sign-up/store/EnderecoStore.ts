import { observable } from 'mobx';
import FormStoreHelperMixin from '../../../../mixin/FormStoreHelperMixin';
import applyMixins from '../../../../util/ApplyMixins';

class EnderecoStore {
  @observable
  public cep: string = '';

  @observable
  public logradouro: string = '';

  @observable
  public complemento: string = '';

  @observable
  public bairro: string = '';

  @observable
  public localidade: string = '';

  @observable
  public uf: string = '';

  @observable
  public unidade: string = '';
}

interface EnderecoStore extends FormStoreHelperMixin{}
applyMixins(EnderecoStore, FormStoreHelperMixin);
export default EnderecoStore;
