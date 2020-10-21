import React, { ReactElement } from 'react';

import { Grid } from '@material-ui/core';
import { TextField } from 'mui-rff';

import { FormContainer } from './components';
import { useBuilderInputName } from '../../../../hook';
import { VetSenhaInput } from '../../../../component';

export default function DadosUsuarioStep(): ReactElement {
  const buildName = useBuilderInputName('usuario');

  return (
    <FormContainer>
      <Grid item container direction='row' alignItems='flex-start' justify='flex-start' alignContent='flex-start' spacing={ 2 }>
        <Grid item>
          <TextField fullWidth
                     required
                     name={buildName('usuario')}
                     label='usuario'
          />
        </Grid>
        <Grid item>
          <VetSenhaInput fullWidth
                         required
                         name={buildName('senha')}
                         label='senha'
          />
        </Grid>
      </Grid>
    </FormContainer>
  )
}
