import React, { ReactElement } from 'react';

import { Route, RouteComponentProps, Switch, Redirect } from 'react-router-dom';

import { CadastroForm, EntrarForm } from '.';

export const AUTENTICACAO_PREFIXO: string = '/autenticacao';
export const ENTRAR_PATH: string = `${ AUTENTICACAO_PREFIXO }/entrar`;
export const CADASTRO_PATH: string = `${ AUTENTICACAO_PREFIXO }/cadastro`;

export default function AutenticacaoRotas({ match, location }: RouteComponentProps): ReactElement {
  const { path } = match;
  const { pathname } = location;

  const podeRedirecionarParaEntrar =
    pathname === AUTENTICACAO_PREFIXO ||
    pathname === `${ AUTENTICACAO_PREFIXO }/`;

  return (
    <Switch>
      {
        podeRedirecionarParaEntrar && (<Redirect to={ ENTRAR_PATH } from={ path } />)
      }
      <Route exact
             path={ ENTRAR_PATH }
             component={ EntrarForm }
      />
      <Route exact
             path={ CADASTRO_PATH }
             component={ CadastroForm }
      />
    </Switch>
  );
}
