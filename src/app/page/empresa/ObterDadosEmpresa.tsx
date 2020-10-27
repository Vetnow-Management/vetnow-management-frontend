import React, { ReactElement, useEffect, useState } from 'react';

import { finalize } from 'rxjs/operators';
import { observer } from 'mobx-react-lite';
import { Redirect, useRouteMatch, useHistory } from 'react-router-dom';
import { ResponseErro, HttpStatus, Verify } from '@vetnow-management/essentials';

import { useRoutes } from '../../hook';
import { ENTRAR_ROTA } from '../autenticacao';
import { useEmpresaContext } from './config/context';
import {
  Token,
  JWTService,
  EmpresaRestService,
  LocalStorageChaves,
  LocalStorageService,
  Empresa,
} from '../../service';
import { EMPRESA_PREFIXO } from './EmpresaRotas';

function ObterDadosEmpresa({ children }: { children: ReactElement }): ReactElement | null {
  const { path } = useRouteMatch();
  const { push, location: { pathname } } = useHistory();
  const { irParaEntrar, irParaDashboard } = useRoutes();
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

  if (!isTokenValid) return <Redirect to={ ENTRAR_ROTA } from={ path }/>;

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

  function realizarRedirect(empresa: Empresa): void {
    configurarEmpresa(empresa);
    // se endereco for so /empresa, tem q ir pra dashboard, pagina default do sistema
    // isso ocorre quando for realizar login, o component de login(EntrarForm.tsx)
    // manda para /empresa
    if (pathname === EMPRESA_PREFIXO) {
      irParaDashboard(empresa.uuid as string);

    // se o usuario colocar o endereco na mao (ex: /empresa/1234/animal)
    // tem q mandar ele pra rota digita.
    // isso pode ocorrer se ele atualizar pagina quando tiver na rota /empresa/1234/animal
    // ai ele vai possar nesse if, ai tem q mandar pra rota q esta no browser.
    } else {
      push(pathname);
    }
  }

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
          .subscribe(
            realizarRedirect,
            realizarLogoutAoFalhar,
          );
      });
  }, []);

  if (isLoading) {
    mostrar();
    // todo: no futuro retornar um loading com svg animado;
    return null;
  }

  // todo: no futuro retornar um loading com svg animado;
  if (Verify.isNullOrUndefined(uuidEmpresa)) return null;

  return children;
}

export default observer(ObterDadosEmpresa);
