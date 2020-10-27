import React, { ReactElement } from 'react';

import { Switch } from 'react-router-dom';

import { Dashboard } from './dashboard';
import { VetRoute } from '../../component';
import ObterDadosEmpresa from './ObterDadosEmpresa';
import { EmpresaContextProvider } from './config/context';

export const EMPRESA_PREFIXO = '/empresa';

function buildRotaDentroEmpresa(path: string): string {
  const pathNormalizado = path.startsWith('/')
    ? path.substring(1)
    : path;

  return `${ EMPRESA_PREFIXO }/:uuid/${pathNormalizado}`;
}

// todas rotas tem q ter o seguinte padrao:
// /empresa/:uuid/seu-path
// so chamar o metodo buildRotaDentroEmpresa q ele monta a sua url padronizada;
export const DASHBOARD_ROTA = buildRotaDentroEmpresa('dashboard');

export default function EmpresaRotas(): ReactElement {
  return (
    <EmpresaContextProvider>
      <ObterDadosEmpresa>
        <Switch>
          <VetRoute exact
                    isProtect
                    path={ DASHBOARD_ROTA }
                    component={ Dashboard }
          />
        </Switch>
      </ObterDadosEmpresa>
    </EmpresaContextProvider>
  );
}
