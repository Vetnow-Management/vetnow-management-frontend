import React, { ReactElement } from 'react';

import { Switch } from 'react-router-dom';

import { Dashboard } from './dashboard';
import { VetRoute } from '../../component';
import { EmpresaContextProvider } from './config/context';
import HandleRedirecionarDashboard from './HandleRedirecionarDashboard';

export const EMPRESA_PREFIXO = '/empresa';
export const DASHBOARD_ROTA = `${ EMPRESA_PREFIXO }/:uuid`;

export default function EmpresaRotas(): ReactElement {
  return (
    <EmpresaContextProvider>
      <Switch>
        <HandleRedirecionarDashboard />
        <VetRoute exact
                  isProtect
                  path={ DASHBOARD_ROTA }
                  component={ Dashboard }
        />
      </Switch>
    </EmpresaContextProvider>
  );
}
