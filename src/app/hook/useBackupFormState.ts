import { get, del } from 'idb-keyval';
import { NomesFormularioSistema } from '../domain';
import { IndexDBConfig } from '../config';
import { Supplier } from '@vetnow-management/essentials';

type IUseBackupFormState<T> = {
  obter: Supplier<Promise<T>>
  remover: Supplier<Promise<void>>
}

export default function useBackupFormState<T>(formName: NomesFormularioSistema): IUseBackupFormState<T> {
  return {
    obter: async () => await get<T>(formName, IndexDBConfig),
    remover: async () => await del(formName, IndexDBConfig),
  };
}
