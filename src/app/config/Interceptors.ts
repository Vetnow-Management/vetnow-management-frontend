import { AxiosResponse } from 'axios';
import { RespostaErro } from '../domain';
import { HttpStatus } from '@vetnow-management/essentials';
import DefaultAppContextValue from './DefaultAppContextValue';

export function onBadRequestResponse(request: AxiosResponse<RespostaErro>): void {
  if (request?.status === HttpStatus.BAD_REQUEST) {
    DefaultAppContextValue.snackBarStore.mostrarErro(request?.data?.mensagem);
  }
}
