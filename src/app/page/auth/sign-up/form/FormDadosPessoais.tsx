import React, { ReactElement } from 'react';

import { Grid } from '@material-ui/core';
import { DatePicker, TextField } from 'mui-rff';
import { observer } from 'mobx-react';

import { FormContainer, FormContato, FormEndereco, } from './components';
import { MaskedTextField } from '../../../../component';

function FormDadosPessoais(): ReactElement {
  console.log('RENDER - FDP');
  return (
    <>
      <FormContainer>
        <Grid item container direction='row' alignItems='center' justify='center' spacing={ 2 }>
          <Grid item xs={ 12 }>
            <TextField fullWidth
                       required
                       name='nome'
                       label='Nome e sobrenome'
            />
          </Grid>
          <Grid item xs={ 12 } sm={ 6 }>
            <DatePicker
              required
              disableFuture
              // helperText={erros?.dtNascimento}
              // error={!!erros?.dtNascimento}
              name='dtNascimento'
              openTo="year"
              format="dd/MM/yyyy"
              label="Data de nascimento"
              views={ ['year', 'month', 'date'] }
            />
          </Grid>
          <Grid item xs={ 12 } sm={ 6 }>
            <MaskedTextField fullWidth
                             required
                             name='documento'
                             label='CPF'
                             options={{
                               delimiters: ['.', '.', '-'],
                               blocks: [3, 3, 3, 2],
                               numericOnly: true,
                             }}
            />
          </Grid>
        </Grid>
      </FormContainer>
      <FormContato />
      <FormEndereco />
    </>
  );
}

export default React.memo(FormDadosPessoais)
