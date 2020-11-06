import React, { ReactElement } from 'react';

import { Router } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { ptBR } from 'date-fns/esm/locale';
import DateFnsUtils from '@date-io/date-fns';
import { SnackbarProvider } from 'notistack';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import {
  MuiThemeProvider,
  StylesProvider,
  CssBaseline,
  createGenerateClassName
} from '@material-ui/core';

import 'react-loaders'
import 'react-block-ui/style.css';
import 'loaders.css/loaders.min.css';
import 'mobx-react-lite/batchingForReactDom'

import Routes from './Routes';
import { Environment } from './util';
import { BlockUI } from './component';
import useAppContext, { AppContextProvider } from './AppContext';
import { HistoryConfig, MateriaUIConfig, KeycloakConfig, keycloakOptions } from './config';

const generateClassName = createGenerateClassName({
  productionPrefix: Environment.APP_NAME,
  seed: Environment.APP_NAME,
})

const SetUpBlockUI = observer((): ReactElement => {
    const { blockUIStore: { estaMostrando }} = useAppContext();

    return (
      <BlockUI isOpen={estaMostrando}>
        <Routes />
      </BlockUI>
    )
  }
);

export default function App() {
  return (
    <StylesProvider generateClassName={generateClassName}>
      <MuiThemeProvider theme={ MateriaUIConfig }>
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBR}>
          <ReactKeycloakProvider authClient={KeycloakConfig} initOptions={keycloakOptions}>
            <SnackbarProvider preventDuplicate>
              <Router history={ HistoryConfig }>
                <AppContextProvider>
                  <CssBaseline />
                  <SetUpBlockUI />
                </AppContextProvider>
              </Router>
            </SnackbarProvider>
          </ReactKeycloakProvider>
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    </StylesProvider>
  );
}
