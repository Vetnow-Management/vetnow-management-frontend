import React from 'react';

import { Route } from 'react-router-dom';
import {
  Fade,
  Menu,
  Theme,
  AppBar,
  Toolbar,
  MenuItem,
  IconButton,
  makeStyles,
  Typography,
  createStyles
} from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import { useKeycloak } from '@react-keycloak/web';

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

function useMenuPerfil() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { keycloak: { logout }} = useKeycloak();

  const menuPerfilEstaAberto = Boolean(anchorEl);
  const menuId = 'id_menu-perfil-appbar';

  function aoClickMenuPerfil({ currentTarget }: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>): void {
    setAnchorEl(currentTarget);
  }

  function aoFecharMenuPerfil(): void {
    setAnchorEl(null);
  }

  const menuPerfil = (
    <Menu open={menuPerfilEstaAberto}
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          id={menuId}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          onClose={aoFecharMenuPerfil}
    >
      <MenuItem onClick={() => logout()}>Sair</MenuItem>
    </Menu>
  );

  return {
    menuId,
    aoClickMenuPerfil,
    menuPerfilComponent: menuPerfil,
  }
}

export default function Bar() {
  const classes = useStyles();
  const { menuId, aoClickMenuPerfil, menuPerfilComponent} = useMenuPerfil();
  const { keycloak } = useKeycloak();

  return (
    <Route>
      <AppBar position="absolute" >
        <Toolbar className={ classes.toolbar }>
          <Typography variant="h6" noWrap className={ classes.toolbarTitle }>
            VETNOW ADMIN
          </Typography>
          <Fade in={keycloak?.authenticated}>
            <IconButton edge='end'
                        aria-label='conta do usuario'
                        aria-controls={menuId}
                        aria-haspopup="true"
                        onClick={aoClickMenuPerfil}
                        color='inherit'
            >
              <AccountCircle />
            </IconButton>
          </Fade>
        </Toolbar>
      </AppBar>
      {keycloak?.authenticated && menuPerfilComponent}
    </Route>
  )
}
