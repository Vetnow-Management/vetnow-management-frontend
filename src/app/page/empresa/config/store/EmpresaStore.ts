import { makeAutoObservable } from 'mobx';

import { Empresa } from '../../../../service/empresa/dominio';

export default class EmpresaStore {
  public uuidEmpresa?: string;

  public constructor() {
    makeAutoObservable(this);
  }

  public configurar = (configuracao: Empresa): void => {
    const {
      uuid,
    } = configuracao;

    this.uuidEmpresa = uuid;
  }

  public limpar = (): void => {
    this.uuidEmpresa = undefined;
  }
}
