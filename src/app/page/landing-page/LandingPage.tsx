import React, {ReactElement} from 'react';

import {Button, Grid, Hidden, TextField} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {BtnCadastro} from '../../component';
import {useRoutes} from '../../hook';
import {Form} from 'react-final-form';
import Particles from 'react-particles-js';

const useStyles = makeStyles({
  root: {
    minHeight: '100vh',
  },
  container: {
    minHeight: '100vh',
  },
  gridStyle: {
    width: '100%',
  },
  particles: {
    position: 'absolute',
    left: 0,
    top: 60,
    bottom: 0,
    width: '100%',
  }
});

export default function LandingPage(): ReactElement {
  const classes = useStyles();
  const {goToSignUp} = useRoutes();

  return (
    <div className={classes.root}>
      <Form
        onSubmit={() => {
        }}
        render={({handleSubmit}) => (
          <form onSubmit={handleSubmit}>
            <Grid
              className={classes.container}
              container
              direction="column"
              justify="center"
              alignItems="center"
              spacing={1}
            >
              <Grid item md={4} xs={10} className={classes.gridStyle}>
                <TextField id="outlined-basic" fullWidth label="Usuário" variant="outlined"/>
              </Grid>
              <Grid item md={4} xs={10} className={classes.gridStyle}>
                <TextField id="outlined-basic" fullWidth label="Senha" variant="outlined"/>
              </Grid>
              <Grid item md={4} xs={10} className={classes.gridStyle}>
                <Button fullWidth
                        variant='contained'
                        color='primary'
                >
                  Acessar
                </Button>

              </Grid>
              <Grid item md={4} xs={10} className={classes.gridStyle}>
                <Hidden smUp>
                  <BtnCadastro
                    onClick={goToSignUp}
                    descricao='EXPERIMENTE GRÁTIS'
                  />
                </Hidden>
              </Grid>
              <Grid item md={4} xs={10} className={classes.gridStyle}>
                <a href="#">Esqueci minha senha.</a>
              </Grid>
            </Grid>
          </form>
        )}
      />
    </div>
  );
}
