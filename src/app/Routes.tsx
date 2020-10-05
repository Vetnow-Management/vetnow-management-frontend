import React, { ReactElement } from 'react';
import { Route, Switch } from 'react-router-dom';
import { makeStyles, Container } from '@material-ui/core';

import { AuthRoutes, HomeRoutes, LandingPageRoutes } from './page';
import { AUTH_PATH_PREFIX } from './page/auth';
import { HOME_PATH_PREFIX } from './page/home';
import { LANDING_PAGE_PREFIX } from './page/landing-page';
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
            <Route exact path={LANDING_PAGE_PREFIX} component={LandingPageRoutes}/>
            <Route path={AUTH_PATH_PREFIX} component={AuthRoutes}/>
            <Route path={HOME_PATH_PREFIX} component={HomeRoutes}/>
          </Switch>
        </Container>
      </main>
    </div>
  );
}
