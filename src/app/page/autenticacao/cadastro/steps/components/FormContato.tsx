import React, { ReactElement } from 'react';

import { TextField } from 'mui-rff';
import { observer } from 'mobx-react';
import { Grid } from '@material-ui/core';

import { FormContainer } from './index';
import { VetMaskedTextField } from '../../../../../component';

function FormContato({ objeto }: { objeto?: string }): ReactElement {
  function getName(name: string): string {
    const root = `contato.${ name }`;

    if (objeto) return `${ objeto }.${ root }`;
    return root;
  }

  return (
    <FormContainer>
      <Grid item container direction='row' alignItems='center' justify='center' spacing={ 2 }>
        <Grid item xs={ 12 } md={6}>
          <TextField fullWidth
                     required
                     name={ getName('email') }
                     label='E-mail'
                     type='email'
          />
        </Grid>
        <Grid item xs={ 12 } md={3}>
          <VetMaskedTextField fullWidth
                              required
                              name={ getName('celular') }
                              label='Celular'
                              mascara='celular'
          />
        </Grid>
        <Grid item xs={ 12 } md={3}>
          <VetMaskedTextField fullWidth
                              name={ getName('telefone') }
                              label='Telefone'
                              mascara='telefone'
          />
        </Grid>
      </Grid>
    </FormContainer>
  );
}

export default observer(FormContato);
