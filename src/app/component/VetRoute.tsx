import React, { ReactElement } from 'react';

import { Route, RouteProps, Redirect, useRouteMatch } from 'react-router-dom';
import JWTService from '../service/jwt/JWTService';
import { ENTRAR_ROTA } from '../page/autenticacao';
import useAppContext from '../AppContext';

export default function VetRoute({ isProtect = false, ...routeProps}: VetRouteProps): ReactElement {
  const match = useRouteMatch();
  const { snackBarStore: { mostrarAlerta }} = useAppContext();

  if (isProtect) {
    const estaValido = JWTService.isAuthorizationJWTValid();
    if (!estaValido) {
      mostrarAlerta('Realize o login novamente')
      return <Redirect to={ENTRAR_ROTA} from={match.path} />
    }
  }

  return (
    <Route {...routeProps}/>
  );
}

type VetRouteProps = {
  /** @default false*/
  isProtect?: boolean;
} & RouteProps;
