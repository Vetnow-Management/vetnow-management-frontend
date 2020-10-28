import React, {useState} from 'react';
import { Route } from 'react-router-dom';
import {
  AppBar,
  createStyles,
  Hidden,
  IconButton,
  makeStyles,
  Menu, MenuItem,
  Theme,
  Toolbar,
  Typography
} from '@material-ui/core';

import { BtnCadastro } from '.';
import { useRoutes } from '../hook';
import { ENTRAR_ROTA } from '../page/autenticacao';
import JWTService from "../service/jwt/JWTService";
import {AccountCircle} from "@material-ui/icons";

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
    width: `calc(100% - ${theme.menuLateral.width}px)`,
    marginLeft: theme.menuLateral.width,
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
  const usuarioLogado = JWTService.isAuthorizationJWTValid();

  const { irParaCadastro } = useRoutes();

  const [anchorEl, setAnchorEl] = useState<EventTarget & HTMLButtonElement>();

  const handleMenu = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(undefined);
  };

  return (
    <Route render={ ({ history: { location: { pathname } } }) => {
      return (
        <AppBar position="absolute" className={`${usuarioLogado ? classes.appBar : ''}`}>
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
            {usuarioLogado &&
            <div>
              <IconButton
                aria-label="perfil do usuario logado"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle/>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Perfil</MenuItem>
                <MenuItem onClick={handleClose}>Sair</MenuItem>
              </Menu>
            </div>}
          </Toolbar>
        </AppBar>
      )
    } }
    />
  )
}
