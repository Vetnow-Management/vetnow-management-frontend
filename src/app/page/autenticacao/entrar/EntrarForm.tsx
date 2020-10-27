import React, { ReactElement } from 'react';

import { TextField } from 'mui-rff';
import { Form } from 'react-final-form';
import { finalize } from 'rxjs/operators';
import { observer } from 'mobx-react-lite';
import { Button, Grid, Hidden, makeStyles } from '@material-ui/core';

import { useRoutes } from '../../../hook';
import useAppContext from '../../../AppContext';
import { handleRequestError } from '../../../util';
import { BtnCadastro, VetSenhaInput } from '../../../component';
import {
  LocalStorageChaves,
  LocalStorageService,
  KeycloakRestService,
} from '../../../service';

const useStyles = makeStyles({
  root: {
    height: 'inherit',
  }
});

function EntrarForm(): ReactElement {
  const classes = useStyles();
  const { irParaCadastro, irParaSolicitarAlteracao, irParaDashboard } = useRoutes();
  const { blockUIStore: { togglePipeable, naoMostrar }} = useAppContext();

  function onSubmit({ senha, usuario }: FormData): void {
     KeycloakRestService
       .obterToken(senha, usuario)
       .pipe(
         togglePipeable,
         finalize(naoMostrar),
       )
       .subscribe(
         (token) => {
           // salvar o username para poder buscar empresa no HandleRedirecionarDashboard
           LocalStorageService.salvar(LocalStorageChaves.TOKEN, { ...token, usuario });
           irParaDashboard();
         },
         handleRequestError('Erro ao realizar login')
       )
  }

  return (
    <Form
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
                <VetSenhaInput id="outlined-basic"
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

export default observer(EntrarForm);
