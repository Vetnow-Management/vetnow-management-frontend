import React, { ReactElement } from 'react';

import { Route, RouteComponentProps, Switch, Redirect } from 'react-router-dom';

import { CadastroForm, EntrarForm } from '.';

export const AUTH_PATH_PREFIX: string = '/auth';

export const SIGN_IN_PATH: string = `${ AUTH_PATH_PREFIX }/sign-in`;
export const SIGN_UP_PATH: string = `${ AUTH_PATH_PREFIX }/sign-up`;

export default function AutenticacaoRotas({ match, location }: RouteComponentProps): ReactElement {
  const { path } = match;
  const { pathname } = location;

  const canRedirectToSignIn =
    pathname === AUTH_PATH_PREFIX ||
    pathname === `${ AUTH_PATH_PREFIX }/`;

  return (
    <Switch>
      {
        canRedirectToSignIn && (<Redirect to={ SIGN_IN_PATH } from={ path } />)
      }
      <Route exact
             path={ SIGN_IN_PATH }
             component={ EntrarForm }
      />
      <Route exact
             path={ SIGN_UP_PATH }
             component={ CadastroForm }
      />
    </Switch>
  );
}
