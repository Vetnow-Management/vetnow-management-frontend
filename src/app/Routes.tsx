import React, { ReactElement } from 'react';
import { makeStyles, Container } from '@material-ui/core';
import { Route, Switch, Redirect } from 'react-router-dom';

import { AutenticacaoRotas, HomeRoutes } from './page';
import { AUTENTICACAO_PREFIXO } from './page/autenticacao';
import { HOME_PATH_PREFIX } from './page/home';
import { VetAppBar } from './component';
import { useBreakpoints } from './hook';
import { RECUPERAR_SENHA_PAGE_PREFIX, RecuperarSenhaRotas } from "./page/recuperar-senha";

function useStyles(appBarHeight: 56 | 64) {
  return makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    content: {
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
    },
    container: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(1),
      height: `calc(100% - ${appBarHeight}px)`,
      '&> div, form': {
        height: 'inherit'
      }
    },
    appBarSpacer: theme.mixins.toolbar,
  }))()
}

export default function Routes(): ReactElement {
  const isSm = useBreakpoints().up('sm');
  const classes = isSm
    ? useStyles(64)
    : useStyles(56);

  return (
    <div className={classes.root}>
      <VetAppBar/>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container} id='CONTAINER'>
          <Switch>
            <Redirect to={AUTENTICACAO_PREFIXO} from='/' exact />
            <Route path={AUTENTICACAO_PREFIXO} component={AutenticacaoRotas}/>
            <Route path={HOME_PATH_PREFIX} component={HomeRoutes}/>
            <Route path={RECUPERAR_SENHA_PAGE_PREFIX} component={RecuperarSenhaRotas}/>
          </Switch>
        </Container>
      </main>
    </div>
  );
}
