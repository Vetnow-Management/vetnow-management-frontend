import React, { ReactElement } from 'react';

import { Route, Switch, useHistory } from 'react-router-dom';

import { HomeRoutes, AuthRoutes, LandingPageRoutes } from './page';
import { AUTH_PATH_PREFIX } from './page/auth';
import { HOME_PATH_PREFIX } from './page/home';
import { LANDING_PAGE_PREFIX } from './page/landing-page';

export default function Routes(): ReactElement {
  return (
    <Switch>
      <Route exact path={ LANDING_PAGE_PREFIX } component={ LandingPageRoutes }/>
      <Route path={ AUTH_PATH_PREFIX } component={ AuthRoutes }/>
      <Route path={ HOME_PATH_PREFIX } component={ HomeRoutes }/>
    </Switch>
  );
}
