import { observable } from 'mobx';
import FormStoreHelperMixin from '../../../../mixin/FormStoreHelperMixin';
import applyMixins from '../../../../util/ApplyMixins';

class UsuarioStore {
  @observable
  public usuario: string = '';

  @observable
  public senha: string = '';

  @observable
  public perfil: string = 'FUNCIONARIO';
}

interface UsuarioStore extends FormStoreHelperMixin{}
applyMixins(UsuarioStore, FormStoreHelperMixin);
export default UsuarioStore;
