import React from 'react';
import { Route } from 'react-router-dom';
import {
  AppBar,
  Hidden,
  Toolbar,
  Typography,
} from '@material-ui/core';

import Alerta from './Alerta';
import { BtnCadastro } from '../index';
import { useRoutes } from '../../hook';
import { useVetAppBarStyles } from './styles';
import { ENTRAR_PATH } from '../../page/autenticacao';

export default function VetAppBar() {
  const classes = useVetAppBarStyles();
  const { irParaCadastro } = useRoutes();

  return (
    <Route render={ ({ history: { location: { pathname } } }) => (
      <AppBar position="absolute" >
        <Toolbar className={ classes.toolbar }>
          <Typography variant="h6" noWrap className={ classes.toolbarTitle }>
            VETNOW ADMIN
          </Typography>
          { pathname === ENTRAR_PATH &&
          <Hidden xsDown>
            <BtnCadastro
              onClick={ irParaCadastro }
              descricao="EXPERIMENTE GRÁTIS"
              ButtonProps={{
                fullWidth: false,
              }}
            />
          </Hidden>
          }
          <Alerta />
        </Toolbar>
      </AppBar>
    )}
    />
  )
}
