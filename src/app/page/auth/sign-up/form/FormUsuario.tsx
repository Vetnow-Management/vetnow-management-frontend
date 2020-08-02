import React, { ReactElement, useContext } from 'react';
import { Grid, TextField } from '@material-ui/core';
import { observer } from 'mobx-react';
import { FormContainer } from './components';
import { signUpContext } from '../context';

function FormUsuario(): ReactElement {
  const {
    cadastroStore: {
      usuario: {
        setCampo: setCamposUsuario,
        usuario,
        senha,
      }
    }
  } = useContext(signUpContext);

  return (
    <Grid item container direction='row' alignItems='center' justify='center' spacing={ 2 }>
      <Grid item xs={ 12 }>
        <TextField fullWidth
                   required
                   name='usuario'
                   label='Usuário'
                   value={ usuario }
                   onChange={ setCamposUsuario }
        />
      </Grid>
      <Grid item xs={ 12 }>
        <TextField fullWidth
                   required
                   type='password'
                   name='senha'
                   label='Senha'
                   value={ senha }
                   onChange={ setCamposUsuario }
        />
      </Grid>
    </Grid>
  );
}

export default observer(FormUsuario);
