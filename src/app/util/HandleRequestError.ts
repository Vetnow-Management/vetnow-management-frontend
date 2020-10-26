import { Consumer, ResponseErro, HttpStatus, Verify } from '@vetnow-management/essentials';

import { DefaultAppContextValue } from '../config';

export default function handleRequestError(msgQuandoOcorrerInternalServerErro: string): Consumer<any> {
  return (err: ResponseErro<any>) => {
    if (err.status === HttpStatus.INTERNAL_SERVER_ERROR) {
      // erro do servidor
      DefaultAppContextValue.snackBarStore.mostrarErro(msgQuandoOcorrerInternalServerErro);
    } else if (Verify.isNotNullOrUndefined(err.status) && err.status !== HttpStatus.BAD_REQUEST) {
      // erro do servidor
      DefaultAppContextValue.snackBarStore.mostrarErro('Ops, algo deu errado');
    }

    // erro do cliente (erro no frontend)
    DefaultAppContextValue.snackBarStore.mostrarErro('Ops, algo deu muito errado');
    // eslint-disable-next-line no-console
    console.error(err);
  }
}
