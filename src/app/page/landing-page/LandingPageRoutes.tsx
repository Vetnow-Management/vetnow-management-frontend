import React, { ReactElement } from 'react';

import {
  Route,
  Switch,
} from 'react-router-dom';

import { LandingPage } from '.';

export const LANDING_PAGE_PREFIX: string = '/'

export default function LandingPageRoutes(): ReactElement {
  return (
    <Switch>
      <Route
        path={ LANDING_PAGE_PREFIX }
        component={ LandingPage }
      />
    </Switch>
  )
}
