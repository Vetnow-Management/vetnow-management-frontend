import React, { ReactElement } from 'react';

import { Grid, TextField } from '@material-ui/core';
import { observer } from 'mobx-react';

import { ContatoStore } from '../../store';
import { FormContainer } from '.';

function FormContato({ contatoStore }: { contatoStore: ContatoStore }): ReactElement {
  const {
    setCampo: setCamposContato,
    celular,
    telefone,
  } = contatoStore;

  return (
    <FormContainer>
      <Grid item container direction='row' alignItems='center' justify='center' spacing={2}>
        <Grid item xs={ 12 } sm={ 6 }>
          <TextField fullWidth
                     required
                     name='celular'
                     label='Celular'
                     value={ celular }
                     onChange={ setCamposContato }
          />
        </Grid>
        <Grid item xs={ 12 } sm={ 6 }>
          <TextField fullWidth
                     required
                     name='telefone'
                     label='Telefone'
                     value={ telefone }
                     onChange={ setCamposContato }
          />
        </Grid>
      </Grid>
    </FormContainer>
  );
}

export default observer(FormContato);
