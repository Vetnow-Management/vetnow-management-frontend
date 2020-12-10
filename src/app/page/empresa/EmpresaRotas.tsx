import React, {ReactElement} from 'react';

import {observer} from 'mobx-react-lite';
import {Redirect, Switch, useHistory} from 'react-router-dom';
import {VetRoute} from '../../component';
import {TUTOR_PREFIXO, TutorRotas} from "./tutor";
import ObterDadosEmpresa from './ObterDadosEmpresa';
import {Dashboard, DASHBOARD_PREFIXO} from './dashboard';
import {EmpresaContextProvider, useEmpresaContext} from './config/context';

export const EMPRESA_PREFIXO = '/empresa';

function buildRotaDentroEmpresa(path: string): string {
  const pathNormalizado = path.startsWith('/')
    ? path.substring(1)
    : path;

  return `${EMPRESA_PREFIXO}/:uuid/${pathNormalizado}`;
}

export const TUTOR_ROTA = buildRotaDentroEmpresa(TUTOR_PREFIXO);
export const DASHBOARD_ROTA = buildRotaDentroEmpresa(DASHBOARD_PREFIXO);

const HandleRedirect = observer((): ReactElement | null => {
    const {location: {pathname}} = useHistory();
    const {empresaStore: {uuidEmpresa}} = useEmpresaContext();

    if (pathname === EMPRESA_PREFIXO) {
      const dashboardRotaNormalizada = DASHBOARD_ROTA
        .replace(':', '')
        .replace('uuid', uuidEmpresa as string);

      return <Redirect to={`${dashboardRotaNormalizada}`}/>
    }

    return <Redirect to={`${pathname}`}/>;
  }
);

export default function EmpresaRotas(): ReactElement {
  return (
    <EmpresaContextProvider>
      <ObterDadosEmpresa>
        <HandleRedirect/>
        <Switch>
          <VetRoute exact
                    isProtect
                    path={DASHBOARD_ROTA}
                    component={Dashboard}
          />
          <VetRoute isProtect
                    path={`${TUTOR_ROTA}`}
                    component={TutorRotas}
          />
        </Switch>
      </ObterDadosEmpresa>
    </EmpresaContextProvider>
  );
}
