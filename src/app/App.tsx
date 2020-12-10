import React, { ReactElement } from 'react';

import { Router } from 'react-router-dom';
import { ptBR } from 'date-fns/esm/locale';
import DateFnsUtils from '@date-io/date-fns';
import { SnackbarProvider } from 'notistack';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import {
  CssBaseline,
  StylesProvider,
  MuiThemeProvider,
  createGenerateClassName,
} from '@material-ui/core';

import 'react-loaders'
import 'react-block-ui/style.css';
import 'loaders.css/loaders.min.css';
import 'mobx-react-lite/batchingForReactDom'

import InitApp from './InitApp';
import { Environment } from './util';
import { AppContextProvider } from './AppContext';
import { HistoryConfig, MateriaUIConfig, KeycloakConfig, keycloakOptions } from './config';

const generateClassName = createGenerateClassName({
  productionPrefix: Environment.APP_NAME,
  seed: Environment.APP_NAME,
})

export default function App(): ReactElement {
  return (
    <StylesProvider generateClassName={generateClassName}>
      <MuiThemeProvider theme={ MateriaUIConfig }>
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBR}>
          <ReactKeycloakProvider authClient={KeycloakConfig} initOptions={keycloakOptions}>
            <SnackbarProvider preventDuplicate>
              <Router history={ HistoryConfig }>
                <AppContextProvider>
                  <CssBaseline />
                  <InitApp />
                </AppContextProvider>
              </Router>
            </SnackbarProvider>
          </ReactKeycloakProvider>
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    </StylesProvider>
  );
}
