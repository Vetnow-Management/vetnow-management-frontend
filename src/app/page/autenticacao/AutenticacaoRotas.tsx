import React, { ReactElement } from 'react';

import { useKeycloak } from '@react-keycloak/web';
import { Route, RouteComponentProps, Switch, Redirect } from 'react-router-dom';

import { CadastroForm, EntrarForm } from '.';
import { EMPRESA_PREFIXO } from '../empresa';

export const AUTENTICACAO_PREFIXO: string = '/autenticacao';
export const ENTRAR_ROTA: string = `${ AUTENTICACAO_PREFIXO }/entrar`;
export const CADASTRO_ROTA: string = `${ AUTENTICACAO_PREFIXO }/cadastro`;

export default function AutenticacaoRotas({ match, location }: RouteComponentProps): ReactElement {
  const { path } = match;
  const { pathname } = location;
  const { keycloak } = useKeycloak();

  const podeRedirecionarParaEntrar =
    pathname === AUTENTICACAO_PREFIXO ||
    pathname === `${ AUTENTICACAO_PREFIXO }/`;

  return (
    <Switch>
      {
        keycloak?.authenticated && <Redirect to={ EMPRESA_PREFIXO } from={path} />
      }
      {
        podeRedirecionarParaEntrar && (<Redirect to={ ENTRAR_ROTA } from={ path } />)
      }
      <Route exact
             path={ ENTRAR_ROTA }
             component={ EntrarForm }
      />
      <Route exact
             path={ CADASTRO_ROTA }
             component={ CadastroForm }
      />
    </Switch>
  );
}
