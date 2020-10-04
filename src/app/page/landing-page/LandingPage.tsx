import React, { ReactElement } from 'react';

import { Button, Grid, Hidden } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Form } from 'react-final-form';
import { TextField } from 'mui-rff';

import { BtnCadastro } from '../../component';
import { useRoutes } from '../../hook';

const useStyles = makeStyles({
  root: {
    height: 'inherit',
  }
});

export default function LandingPage(): ReactElement {
  const classes = useStyles();
  const { goToSignUp } = useRoutes();

  return (
    <Form
      onSubmit={ () => {
      } }
      render={ ({ handleSubmit }) => (
        <form onSubmit={ handleSubmit } className={ classes.root }>
          <Grid container className={ classes.root } item xs={12} alignItems='center' justify='center'>
            <Grid container
                  item
                  direction='column'
                  alignItems='center'
                  justify='center'
                  xs={12}
                  sm={7}
                  md={5}
                  spacing={1}
            >
              <Grid container item>
                <TextField id="outlined-basic"
                           name='usuario'
                           fullWidth
                           label="Usuário"
                           variant="outlined"
                />
              </Grid>

              <Grid container item>
                <TextField id="outlined-basic"
                           name='senha'
                           fullWidth
                           label="Senha"
                           variant="outlined"
                />
              </Grid>
              <Grid container item>
                <Button fullWidth
                        variant='contained'
                        color='primary'
                >
                  Acessar
                </Button>
              </Grid>
              <Hidden smUp>
                <Grid container item>
                  <BtnCadastro
                    onClick={ goToSignUp }
                    descricao='EXPERIMENTE GRÁTIS'
                  />
                </Grid>
              </Hidden>
              <Grid item container justify='flex-end'>
                <Button color='secondary'>Esqueci minha senha.</Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      ) }
    />
  );
}
