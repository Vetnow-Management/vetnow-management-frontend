import { IContato } from './IContato';
import { IUsuario } from './IUsuario';

export interface IEmpresaNovo {
  razaoSocial?: string;
  documento?: string;
  contato?: IContato;
  usuario: IUsuario;
}
