import { Contato } from './Contato';

export interface EmpresaNovo {
  razaoSocial?: string;
  documento?: string;
  contato?: Contato;
}
