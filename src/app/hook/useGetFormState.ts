import { get } from 'idb-keyval';
import { NomesFormularioSistema } from '../domain';
import { IndexDBConfig } from '../config';

export default async function useGetFormState<T>(formName: NomesFormularioSistema): Promise<T | null> {
  return await get<T>(formName, IndexDBConfig);
}
