import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { HttpStatus } from '@vetnow-management/essentials';

import { Environment } from '../util';
import { RespostaErro } from '../domain';
import DefaultAppContextValue from './DefaultAppContextValue';
import { LocalStorageChaves, LocalStorageService, Token } from '../service';

export function onBadRequestResponse(request: AxiosResponse<RespostaErro>): void {
  if (request?.status === HttpStatus.BAD_REQUEST) {
    DefaultAppContextValue.snackBarStore.mostrarErro(request?.data?.mensagem);
  }
}

export function addAuthorization(request: AxiosRequestConfig): void {
  const originalURL = request?.url ?? '';
  const originalMethod = request?.method?.toLowerCase();

  const podeAdicionarToken = RECURSOS_IGNORAR_AUTHORIZATION
    .some(({ endpoint, method}) => !(endpoint === originalURL && originalMethod === method))
    && originalURL.startsWith(Environment.API_URL);

  if (podeAdicionarToken) {
    LocalStorageService
      .obter<Token>(LocalStorageChaves.TOKEN)
      .map(token => [token.jwt, token.tokenType])
      .ifPresent(([jwt, bearer]) => {
        request.headers.Authorization = `${bearer} ${jwt}`;
      })
  }
}

type TYPE_RECURSOS_IGNORAR_AUTHORIZATION = [
  {
    endpoint: string;
    method?: string
  }
];

const RECURSOS_IGNORAR_AUTHORIZATION: TYPE_RECURSOS_IGNORAR_AUTHORIZATION = [
  {
    endpoint: `${Environment.API_URL}/pessoa`,
    method: 'post'
  }
]
