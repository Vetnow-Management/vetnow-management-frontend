import React from 'react';

import { MuiThemeProvider, StylesProvider, createGenerateClassName } from '@material-ui/core';
import { Router } from 'react-router-dom';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { observer } from 'mobx-react';
import { ptBR } from 'date-fns/esm/locale';
import 'mobx-react-lite/batchingForReactDom'
import 'react-block-ui/style.css';
import 'react-loaders'
import 'loaders.css/loaders.min.css';

import { HistoryConfig, MateriaUIConfig } from './config';
import './App.scss';
import Routes from './Routes';
import { Environment } from './util';
import { BlockUI } from './component';
import useAppContext, { AppContextProvider } from './AppContext';

const generateClassName = createGenerateClassName({
  productionPrefix: Environment.APP_NAME,
  seed: Environment.APP_NAME,
})

function App() {
  const { blockUIStore: { estaMostrando }} = useAppContext();
  return (
    <StylesProvider generateClassName={generateClassName}>
      <MuiThemeProvider theme={ MateriaUIConfig }>
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBR}>
          <Router history={ HistoryConfig }>
            <AppContextProvider>
              <BlockUI isOpen={estaMostrando}>
                <Routes />
              </BlockUI>
            </AppContextProvider>
          </Router>
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    </StylesProvider>
  );
}

export default observer(App);
