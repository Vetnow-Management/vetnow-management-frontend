import React, { ReactElement } from 'react';

import { Grid } from '@material-ui/core';
import { DatePicker, TextField } from 'mui-rff';

import { FormContainer, FormContato, FormEndereco } from './components';

function FormDadosEmpresariais(): ReactElement {
  function getName(name: string): string {
    return `empresa.${name}`;
  }

  return (
    <>
      <FormContainer>
        <Grid item container direction='row' alignItems='center' justify='center' spacing={ 2 }>
          <Grid item xs={ 12 }>
            <TextField fullWidth
                       required
                       name={getName('razaoSocial')}
                       label='Razão social'
            />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth
                       required
                       name={getName('documento')}
                       label='CNPJ'
            />

          </Grid>
          <Grid item xs={12}>
            <DatePicker
              required
              disableFuture
              name={getName('dataAbertura')}
              openTo="year"
              format="dd/MM/yyyy"
              label="Data de abertura"
              views={ ['year', 'month', 'date'] }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth
                       required
                       name={getName('nitPisPasep')}
                       label='nitPisPasep'
            />
          </Grid>
        </Grid>
      </FormContainer>
      <FormEndereco objeto='empresa' />
      <FormContato objeto='empresa' />
    </>
  );
}

export default React.memo(FormDadosEmpresariais);
