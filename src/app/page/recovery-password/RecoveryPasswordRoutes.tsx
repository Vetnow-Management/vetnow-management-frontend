import React, {ReactElement} from 'react';
import {Route, Switch,} from 'react-router-dom';
import {RecoveryPassword} from ".";

export const RECOVERY_PASSWORD_PAGE_PREFIX: string = '/recovery-password'

export default function RecoveryPasswordRoutes(): ReactElement {
  return (
    <Switch>
      <Route
        path={RECOVERY_PASSWORD_PAGE_PREFIX}
        component={RecoveryPassword}
      />
    </Switch>
  )
}
