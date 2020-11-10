import React, { ReactElement } from 'react';

import {
  Fade,
  Theme,
  AppBar,
  Toolbar,
  IconButton,
  makeStyles,
  Typography,
  createStyles
} from '@material-ui/core';
import { Route } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';
import { AccountCircle as AccountCircleIcon } from '@material-ui/icons';

import { useBarStyle } from './styles';
import Notificacoes from './Notificacoes';
import useMenuPerfil from './useMenuPerfil';
import NotificacoesButton from './NotificacoesButton';

export default function Bar(): ReactElement {
  const classes = useBarStyle();
  const { keycloak } = useKeycloak();
  const { menuId, aoClickMenuPerfil, menuPerfilComponent} = useMenuPerfil();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  function aoClickNotificacoes({ currentTarget }: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>): void {
    setAnchorEl(currentTarget);
  }

  function aoFecharNotificacoes(): void {
    setAnchorEl(null);
  }

  return (
    <Route>
      <AppBar position="absolute" >
        <Toolbar className={ classes.toolbar }>
          <Typography variant="h6" noWrap className={ classes.toolbarTitle }>
            VETNOW ADMIN
          </Typography>
          <NotificacoesButton aoClickNotificacoes={aoClickNotificacoes} />
          <Fade in={keycloak?.authenticated} unmountOnExit mountOnEnter>
            <IconButton edge='end'
                        aria-label='conta do usuario'
                        aria-controls={menuId}
                        aria-haspopup="true"
                        onClick={aoClickMenuPerfil}
                        color='inherit'
            >
              <AccountCircleIcon />
            </IconButton>
          </Fade>
        </Toolbar>
      </AppBar>
      {keycloak?.authenticated && menuPerfilComponent}
      <Notificacoes anchorEl={anchorEl} aoFecharNotificacoes={aoFecharNotificacoes} />
    </Route>
  )
}
