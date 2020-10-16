import React, { ReactElement } from 'react';
import { makeStyles, Container } from '@material-ui/core';
import { Route, Switch, Redirect } from 'react-router-dom';

import { AuthRoutes, HomeRoutes } from './page';
import { AUTH_PATH_PREFIX } from './page/autenticacao';
import { HOME_PATH_PREFIX } from './page/home';
import { Bar } from './component';
import { useBreakpoints } from './hook';

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
            <Redirect to={AUTH_PATH_PREFIX} from='/' exact />
            <Route path={AUTH_PATH_PREFIX} component={AuthRoutes}/>
            <Route path={HOME_PATH_PREFIX} component={HomeRoutes}/>
          </Switch>
        </Container>
      </main>
    </div>
  );
}
