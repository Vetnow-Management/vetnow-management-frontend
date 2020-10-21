import React, { ReactElement } from 'react';

import { TextField } from 'mui-rff';
import { Form } from 'react-final-form';
import { Button, Grid, Hidden, makeStyles } from '@material-ui/core';

import { useRoutes } from '../../../hook';
import useAppContext from '../../../AppContext';
import { BtnCadastro } from '../../../component';
import { handleRequestError } from '../../../util';
import { LocalStorageChaves, LocalStorageService, Token, KeycloakRestService } from '../../../service';

const useStyles = makeStyles({
  root: {
    height: 'inherit',
  }
});

function realizarLogin(token: Token): void {
  LocalStorageService.salvar(LocalStorageChaves.TOKEN, token);
  const tokenSaved = LocalStorageService.obter(LocalStorageChaves.TOKEN).get();
  console.log('TOKEN FROM LOCALSTORAGE\n: ', tokenSaved);
}

export default function EntrarForm(): ReactElement {
  const classes = useStyles();
  const { irParaCadastro, irParaSolicitarAlteracao } = useRoutes();
  const { snackBarStore: { mostrarSucesso }} = useAppContext();

  function onSubmit({ senha, usuario }: FormData): void {
      KeycloakRestService.obterToken(senha, usuario)
        .subscribe(
          token => {
            realizarLogin(token);
            mostrarSucesso('Login realizado com sucesso!')
          },
          handleRequestError('Erro ao fazer login')
        );
  }

  return (
    <Form<FormData>
      onSubmit={ onSubmit }
      render={ ({ handleSubmit }) => (
        <form onSubmit={ handleSubmit }>
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
                           type='password'
                           fullWidth
                           label="Senha"
                           variant="outlined"
                />
              </Grid>
              <Grid container item>
                <Button fullWidth
                        variant='contained'
                        color='primary'
                        type='submit'
                >
                  Acessar
                </Button>
              </Grid>
              <Hidden smUp>
                <Grid container item>
                  <BtnCadastro
                    onClick={ irParaCadastro }
                    descricao='EXPERIMENTE GRÁTIS'
                  />
                </Grid>
              </Hidden>
              <Grid item container justify='flex-end'>
                <Button
                  color='secondary'
                  onClick={ irParaSolicitarAlteracao }
                >Esqueci minha senha.</Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      ) }
    />
  );
}

type FormData = {
  usuario: string;
  senha: string;
}
