import React, { ReactElement } from 'react';

import { Grid } from '@material-ui/core';
import { DatePicker, TextField } from 'mui-rff';

import { FormContainer, FormContato, FormEndereco, } from './components';
import { VetMaskedTextField } from '../../../../component';
import { Sanitizer } from '@vetnow-management/essentials';

function DadosPessoaisStep(): ReactElement {
  return (
    <>
      <FormContainer>
        <Grid item container direction='row'  spacing={ 2 }>
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
              name='dtNascimento'
              openTo="year"
              format="dd/MM/yyyy"
              label="Data de nascimento"
              views={ ['year', 'month', 'date'] }
            />
          </Grid>
          <Grid item xs={ 12 } sm={ 6 }>
            <VetMaskedTextField fullWidth
                                required
                                name='documento'
                                label='CPF'
                                mascara='cpf'
                                fieldProps={{
                                  parse: Sanitizer.cpf,
                                }}
            />
          </Grid>
        </Grid>
      </FormContainer>
      <FormEndereco />
      <FormContato />
    </>
  );
}

export default React.memo(DadosPessoaisStep)
