import React, { ReactElement } from 'react';

import { useKeycloak } from '@react-keycloak/web';
import { makeStyles, Container, Fade } from '@material-ui/core';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';

import { useBreakpoints } from './hook';
import { EMPRESA_PREFIXO } from './page/empresa';
import { AUTENTICACAO_PREFIXO } from './page/autenticacao';
import { Bar, LoadingCentralizado, VetRoute } from './component';
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
  const { initialized } = useKeycloak();

  const classes = isSm
    ? useStyles(64)
    : useStyles(56);

  if (!initialized) {
    return <LoadingCentralizado />;
  }

  return (
    <Fade in={initialized} unmountOnExit mountOnEnter>
      <div className={classes.root}>
        <Bar/>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container} id='CONTAINER'>
            <Switch>
              <Redirect to={EMPRESA_PREFIXO} from='/' exact />
              <Route path={AUTENTICACAO_PREFIXO} component={AutenticacaoRotas} />
              <Route path={RECUPERAR_SENHA_PREFIXO} component={RecuperarSenhaRotas} />
              <VetRoute isProtect path={EMPRESA_PREFIXO} component={EmpresaRotas} />
            </Switch>
          </Container>
        </main>
      </div>
    </Fade>
  );
}
