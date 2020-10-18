import { Consumer } from '@vetnow-management/essentials';
import { DefaultAppContextValue } from '../config';

/**
 * @param msgQuandoOcorrerInternalServerErro - Msg a ser mostrada quando
 * @param msgQuandoOCorrerErro
 */
export default function handleRequestError(
  msgQuandoOcorrerInternalServerErro: string,
  msgQuandoOCorrerErro: string = 'Ops, algo deu errado',
  ): Consumer<Error> {
  return (err) => {
    if (err?.message === 'Request failed with status code 500') {
      DefaultAppContextValue.snackBarStore.showError(msgQuandoOcorrerInternalServerErro);
    } else if(err?.message !== 'Request failed with status code 400') {
      DefaultAppContextValue.snackBarStore.showError(msgQuandoOCorrerErro);
    }

    // eslint-disable-next-line no-console
    console.error(err);
  }
}
