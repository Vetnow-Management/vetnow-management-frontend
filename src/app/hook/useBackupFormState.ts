import { get, del } from 'idb-keyval';
import { Optional, Supplier } from '@vetnow-management/essentials';

import { IndexDBConfig } from '../config';
import { NomesFormularioSistema } from '../domain';

type IUseBackupFormState<T> = {
  obter: Supplier<Promise<Optional<T>>>
  remover: Supplier<Promise<void>>
}

export default function useBackupFormState<T>(formName: NomesFormularioSistema): IUseBackupFormState<T> {
  return {
    obter: async () => await get<T>(formName, IndexDBConfig).then(value => Optional.from(value)),
    remover: async () => await del(formName, IndexDBConfig),
  };
}
