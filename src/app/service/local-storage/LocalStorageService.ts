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

    const valorParsed = JSON.stringify(valor);
    localStorage.setItem(chave, valorParsed);
  }

  public obter<T>(chave: LocalStorageChaves): Optional<T> {
    const valor = localStorage.getItem(chave);

    return Optional
      .from(valor)
      .map(JSON.parse)
  }
}

export default new LocalStorageService();
