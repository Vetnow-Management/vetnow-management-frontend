import React, { ReactElement } from 'react';

import {
  Route,
  Switch,
} from 'react-router-dom';

import { Dashboard } from '.';

export const HOME_PATH_PREFIX: string = '/home';

export const DASHBOARD_PATH: string = `${HOME_PATH_PREFIX}/dashboard`;

export default function HomeRoutes(): ReactElement {
  return (
    <Switch>
      <Route
        path={ DASHBOARD_PATH }
        component={ Dashboard }
      />
    </Switch>
  );
}
