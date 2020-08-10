import React, { ReactElement, useEffect, useState } from 'react';

import { Route, Switch, useHistory, RouteComponentProps } from 'react-router-dom';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { HomeRoutes, AuthRoutes, LandingPageRoutes } from './page';
import { AUTH_PATH_PREFIX, SIGN_IN_PATH } from './page/auth';
import { HOME_PATH_PREFIX } from './page/home';
import { LANDING_PAGE_PREFIX } from './page/landing-page';
import { Grid, Button, Hidden } from '@material-ui/core';
import { BtnCadastro } from './component';
import { useRoutes } from './hook';

const COLOR_GRADIENT = '#FE6B8B';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    padding: 10,
    maxHeight: 60,
    backgroundColor: theme.palette.primary.main,
  },
  logo: {
    margin: 0,
    fontSize: 20,
    color: '#FFFF',
    textTransform: 'uppercase',
    fontWeight: 'bold'
  },
  lineBottom: {
    height: 4,
    background: `linear-gradient(45deg, ${COLOR_GRADIENT} 30%, ${theme.palette.secondary.main} 90%)`,
  }
}));


export default function Routes(): ReactElement {
  const classes = useStyles();
  const { goToSignUp } = useRoutes();

  return (
    <>
      <Grid
        container
        direction="row"
        alignItems="center"
        justify="space-between"
        className={classes.root}
      >
        <Grid item>
          <p className={classes.logo}>LOGO</p>
        </Grid>
        <Grid item>
          <Hidden xsDown>
            <BtnCadastro
              onClick={goToSignUp}
              descricao='EXPERIMENTE GRÁTIS'
            />
          </Hidden>
        </Grid>
      </Grid>
      <div className={classes.lineBottom} />
      <Switch>
        <Route exact path={LANDING_PAGE_PREFIX} component={LandingPageRoutes} />
        <Route path={AUTH_PATH_PREFIX} component={AuthRoutes} />
        <Route path={HOME_PATH_PREFIX} component={HomeRoutes} />
      </Switch>
    </>
  );
}
