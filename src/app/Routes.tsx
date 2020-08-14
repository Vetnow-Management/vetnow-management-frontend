import React, { ReactElement } from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthRoutes, HomeRoutes, LandingPageRoutes } from './page';
import { AUTH_PATH_PREFIX } from './page/auth';
import { HOME_PATH_PREFIX } from './page/home';
import { LANDING_PAGE_PREFIX } from './page/landing-page';
import { Bar } from './component';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  main: {
    height: '100%',
    overflow: 'hidden',
  }
});

export default function Routes(): ReactElement {
  const classes = useStyles();
  return (
    <div className={classes.main}>
      <Bar/>
      <main>
        <Switch>
          <Route exact path={LANDING_PAGE_PREFIX} component={LandingPageRoutes}/>
          <Route path={AUTH_PATH_PREFIX} component={AuthRoutes}/>
          <Route path={HOME_PATH_PREFIX} component={HomeRoutes}/>
        </Switch>
      </main>
    </div>
  );
}
