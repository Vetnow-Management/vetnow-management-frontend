import { observable } from 'mobx';
import FormStoreHelperMixin from '../../../../mixin/FormStoreHelperMixin';
import applyMixins from '../../../../util/ApplyMixins';

class ContatoStore {
  @observable
  public contato: string = '';

  @observable
  public celular: string = '';

  @observable
  public telefone: string = '';
}

interface ContatoStore extends FormStoreHelperMixin{}
applyMixins(ContatoStore, FormStoreHelperMixin);
export default ContatoStore;
