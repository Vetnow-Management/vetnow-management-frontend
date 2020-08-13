import React from 'react';

import 'mobx-react-lite/batchingForReactDom'
import { MuiThemeProvider, StylesProvider, createGenerateClassName } from '@material-ui/core';
import { Router } from 'react-router-dom';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { ptBR } from 'date-fns/esm/locale';

import { HistoryConfig, MateriaUIConfig } from './config';
import './App.scss';
import Routes from './Routes';
import { Environment } from './util';

const generateClassName = createGenerateClassName({
  productionPrefix: Environment.APP_NAME,
  seed: Environment.APP_NAME,
})

export default function App() {
  return (
    <StylesProvider generateClassName={generateClassName}>
      <MuiThemeProvider theme={ MateriaUIConfig }>
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBR}>
          <Router history={ HistoryConfig }>
            <Routes />
          </Router>
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    </StylesProvider>
  );
}
