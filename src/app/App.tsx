import React from 'react';

import { MuiThemeProvider } from '@material-ui/core';
import { Router } from 'react-router-dom';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { ptBR } from 'date-fns/esm/locale';

import { HistoryConfig, MateriaUIConfig } from './config';
import './App.scss';
import Routes from './Routes';

export default function App() {
  return (
    <MuiThemeProvider theme={ MateriaUIConfig }>
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBR}>
        <Router history={ HistoryConfig }>
          <Routes />
        </Router>
      </MuiPickersUtilsProvider>
    </MuiThemeProvider>
  );
}
