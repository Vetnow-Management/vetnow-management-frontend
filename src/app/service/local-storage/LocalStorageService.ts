import { cloneDeepWith } from 'lodash-es';
import { isValid, getTime } from 'date-fns';
import { Optional, Verify } from '@vetnow-management/essentials';

import { LocalStorageChaves } from './LocalStorageChaves';

class LocalStorageService {
  public salvar(chave: LocalStorageChaves, valor: NonNullable<unknown>): void {
    if (Verify.isNullOrUndefined(valor)) {
      // eslint-disable-next-line no-console
      console.warn(`
        Tentativa de salvar um valor Null ou Undefined no localStorage.
        \n
        Chave: ${chave}
      `);
      return;
    }

    const valorParsed = JSON.stringify(cloneDeepWith(valor, (valorAtual) => {
      // converte todos Date para timestamp
      if (isValid(valorAtual)) return getTime(valorAtual);
    }));
    localStorage.setItem(chave, valorParsed);
  }

  public obter<T>(chave: LocalStorageChaves): Optional<T> {
    const valor = localStorage.getItem(chave);

    return Optional
      .from(valor)
      .map(JSON.parse)
      .map((json) => {
        return cloneDeepWith(json, (value) => {
          // converte todos timestamp para Date
          if (isValid(value)) return new Date(value);
        });
      })
  }

  public remover(chave: LocalStorageChaves): void {
    localStorage.removeItem(chave);
  }
}

export default new LocalStorageService();
