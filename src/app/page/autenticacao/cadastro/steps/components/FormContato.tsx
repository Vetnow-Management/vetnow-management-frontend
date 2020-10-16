import React, { ReactElement } from 'react';

import { Grid } from '@material-ui/core';
import { TextField } from 'mui-rff';
import { observer } from 'mobx-react';

import { FormContainer } from './index';
import { MaskedTextField } from '../../../../../component';

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
          <MaskedTextField fullWidth
                           required
                           name={ getName('celular') }
                           label='Celular'
                           options={ {
                             delimiters: ['(', ')', ' ', '-'],
                             blocks: [0, 2, 0, 5, 4],
                             numericOnly: true,
                           } }
          />
        </Grid>
        <Grid item xs={ 12 } md={3}>
          <MaskedTextField fullWidth
                           name={ getName('telefone') }
                           label='Telefone'
                           options={ {
                             delimiters: ['(', ')', ' ', '-'],
                             blocks: [0, 2, 0, 4, 4],
                             numericOnly: true,
                           } }
          />
        </Grid>
      </Grid>
    </FormContainer>
  );
}

export default observer(FormContato);
