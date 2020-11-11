import React, { PropsWithChildren, ReactElement, useEffect } from 'react';

import { observer } from 'mobx-react-lite';
import { useKeycloak } from '@react-keycloak/web';
import { ResponseErro, Verify } from '@vetnow-management/essentials';

import { useEmpresaContext } from './config/context';
import { LoadingCentralizado } from '../../component';
import {
  EmpresaRestService,
} from '../../service';

function ObterDadosEmpresa({ children }: PropsWithChildren<any>): ReactElement | null {
  const { keycloak } = useKeycloak();

  const {
    empresaStore: {
      configurar: configurarEmpresa,
      limpar: limparEmpresa,
      uuidEmpresa,
    },
    snackBarStore: { mostrarErro },
  } = useEmpresaContext();

  function realizarLogoutAoFalhar(err: ResponseErro<any>): void {
    // eslint-disable-next-line no-console
    console.error(err);
    mostrarErro('Algo deu errado ao obter sua empresa', {
      textoBotao: 'Sair',
      aoClicarParaFecharSnackBar: () => {
        limparEmpresa();
        keycloak.logout()
      },
    });
  }

  useEffect(() => {
    EmpresaRestService
      // @ts-ignore: email nao ta mapeado na interface do keycloak
      .obter({email: keycloak.tokenParsed.email})
      .subscribe(
        configurarEmpresa,
        realizarLogoutAoFalhar,
      )
  }, []);

  if (Verify.isNullOrUndefined(uuidEmpresa)) return <LoadingCentralizado />;

  return children;
}

export default observer(ObterDadosEmpresa);
