import React, { ReactElement, useEffect, useState } from 'react';

import { finalize } from 'rxjs/operators';
import { observer } from 'mobx-react-lite';
import { Redirect, useRouteMatch } from 'react-router-dom';
import { ResponseErro, HttpStatus } from '@vetnow-management/essentials';

import { ENTRAR_ROTA } from '../autenticacao';
import { DASHBOARD_ROTA } from './EmpresaRotas';
import { useEmpresaContext } from './config/context';
import { useObterUUIDEmpresaDaURL, useRoutes } from '../../hook';
import {
  Token,
  JWTService,
  EmpresaRestService,
  LocalStorageChaves,
  LocalStorageService
} from '../../service';


function HandleRedirecionarDashboard(): ReactElement | null {
  const { path } = useRouteMatch();
  const { irParaEntrar } = useRoutes();
  const uuidFromUrl = useObterUUIDEmpresaDaURL();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    empresaStore: {
      configurar: configurarEmpresa,
      limpar: limparEmpresa,
      uuidEmpresa,
    },
    blockUIStore: { mostrar, naoMostrar },
    snackBarStore: { mostrarErro },
  } = useEmpresaContext();

  const isTokenValid = JWTService.isAuthorizationJWTValid();

  const dashboardRotaFormatado = DASHBOARD_ROTA
    .replace(':', '')
    .replace(
      'uuid',
      uuidEmpresa ?? uuidFromUrl ?? '');

  function realizarLogoutAoFalhar(err: ResponseErro<any>): void {
    LocalStorageService.remover(LocalStorageChaves.TOKEN);
    irParaEntrar();
    limparEmpresa();
    if (err?.status !== HttpStatus.BAD_REQUEST) {
      mostrarErro('Algo deu errado ao obter sua empresa');
      // eslint-disable-next-line no-console
      console.error(`Erro ao obter empresa: `, err);
    }
  }

  if (!isTokenValid) return <Redirect to={ ENTRAR_ROTA } from={ path }/>;

  useEffect(() => {
    LocalStorageService.obter<Token>(LocalStorageChaves.TOKEN)
      .ifPresent(({ usuario }) => {
        setIsLoading(true);
        EmpresaRestService
          .obter(usuario)
          .pipe(finalize(() => {
            setIsLoading(false);
            naoMostrar();
          }))
          .subscribe(configurarEmpresa, realizarLogoutAoFalhar);
      });
  }, []);

  if (isLoading) {
    mostrar()
    return null;
  }
  return <Redirect to={ dashboardRotaFormatado } from={ path }/>;
}

export default observer(HandleRedirecionarDashboard);
