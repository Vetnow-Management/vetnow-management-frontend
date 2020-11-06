import React, { ReactElement } from 'react';

import { useKeycloak } from '@react-keycloak/web';
import { Route, RouteProps, Redirect, useRouteMatch } from 'react-router-dom';

import { ENTRAR_ROTA } from '../page/autenticacao';

export default function VetRoute({ isProtect = false, ...routeProps}: VetRouteProps): ReactElement {
  const match = useRouteMatch();
  const { keycloak } = useKeycloak();

  if (isProtect) {
    if (!keycloak?.authenticated) {
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
