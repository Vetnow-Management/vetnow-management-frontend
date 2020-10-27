import React from 'react';
import { Route } from 'react-router-dom';
import { AppBar, createStyles, Hidden, makeStyles, Theme, Toolbar, Typography } from '@material-ui/core';

import { BtnCadastro } from '.';
import { useRoutes } from '../hook';
import { ENTRAR_ROTA } from '../page/autenticacao';

const COLOR_GRADIENT = '#FE6B8B';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    borderBottomWidth: 4,
    borderColor: `linear-gradient(45deg, ${ COLOR_GRADIENT } 30%, ${ theme.palette.secondary.main } 90%)`,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  logo: {
    margin: 0,
    fontSize: 20,
    color: '#FFFF',
    textTransform: 'uppercase',
    fontWeight: 'bold'
  },
  lineBottom: {
    height: 4,
    background: `linear-gradient(45deg, ${ COLOR_GRADIENT } 30%, ${ theme.palette.secondary.main } 90%)`,
  },

  appBar: {
    borderBottom: `1px solid ${ theme.palette.divider }`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
}));

export default function Bar() {
  const classes = useStyles();
  const { irParaCadastro } = useRoutes();

  return (
    <Route render={ ({ history: { location: { pathname } } }) => {
      return (
        <AppBar position="absolute" >
          <Toolbar className={ classes.toolbar }>
            <Typography variant="h6" noWrap className={ classes.toolbarTitle }>
              VETNOW ADMIN
            </Typography>
            { pathname === ENTRAR_ROTA &&
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
          </Toolbar>
        </AppBar>
      )
    } }
    />
  )
}
