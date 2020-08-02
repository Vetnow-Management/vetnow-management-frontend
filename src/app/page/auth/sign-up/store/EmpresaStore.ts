import { observable } from 'mobx';
import FormStoreHelperMixin from '../../../../mixin/FormStoreHelperMixin';
import applyMixins from '../../../../util/ApplyMixins';
import { EnderecoStore, ContatoStore } from './index';

class EmpresaStore {
  @observable
  public razaoSocial: string = '';

  @observable
  public documento: string = '';

  @observable
  public nitPisPasep: string = '';

  @observable
  public dataAbertura: string = '';

  @observable
  public endereco: EnderecoStore = new EnderecoStore();

  @observable
  public contato: ContatoStore = new ContatoStore();

  @observable
  public chave: {chave: string} | null = null;
}

interface EmpresaStore extends FormStoreHelperMixin{}
applyMixins(EmpresaStore, FormStoreHelperMixin);
export default EmpresaStore;
