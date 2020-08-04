import React, { ReactElement } from 'react';

import { Grid } from '@material-ui/core';
import { TextField } from 'mui-rff';
import { observer } from 'mobx-react';

import { FormContainer } from '.';

function FormContato({objeto}: {objeto?: string}): ReactElement {

  function getName(name: string): string {
    const root = `contato.${name}`;

    if (objeto) return `${objeto}.${root}`;
    return root;
  }

  return (
    <FormContainer>
      <Grid item container direction='row' alignItems='center' justify='center' spacing={2}>
        <Grid item xs={ 12 } sm={ 6 }>
          <TextField fullWidth
                     required
                     name={getName('celular')}
                     label='Celular'
          />
        </Grid>
        <Grid item xs={ 12 } sm={ 6 }>
          <TextField fullWidth
                     required
                     name={getName('telefone')}
                     label='Telefone'
          />
        </Grid>
      </Grid>
    </FormContainer>
  );
}

export default observer(FormContato);
