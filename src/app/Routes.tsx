import React, { ReactElement } from 'react';

import { makeStyles, Container } from '@material-ui/core';
import { Route, Switch, Redirect } from 'react-router-dom';

import { Bar } from './component';
import { useBreakpoints } from './hook';
import { EMPRESA_PREFIXO } from './page/empresa';
import { AUTENTICACAO_PREFIXO } from './page/autenticacao';
import { RECUPERAR_SENHA_PREFIXO } from './page/recuperar-senha';
import { AutenticacaoRotas, EmpresaRotas, RecuperarSenhaRotas } from './page';

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
      <Bar/>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container} id='CONTAINER'>
          <Switch>
            <Redirect to={EMPRESA_PREFIXO} from='/' exact />
            <Route path={AUTENTICACAO_PREFIXO} component={AutenticacaoRotas} />
            <Route path={RECUPERAR_SENHA_PREFIXO} component={RecuperarSenhaRotas} />
            <Route path={EMPRESA_PREFIXO} component={EmpresaRotas} />
          </Switch>
        </Container>
      </main>
    </div>
  );
}
