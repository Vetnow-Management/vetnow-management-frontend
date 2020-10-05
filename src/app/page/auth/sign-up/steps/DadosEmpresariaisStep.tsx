import React, { ReactElement } from 'react';

import { Grid } from '@material-ui/core';
import { DatePicker, TextField } from 'mui-rff';

import { FormContainer, FormContato, FormEndereco } from './components';
import { useBuilderInputName } from '../../../../hook';

function DadosEmpresariaisStep(): ReactElement {
  const buildName = useBuilderInputName('empresa');

  return (
    <>
      <FormContainer>
        <Grid item container direction='row' alignItems='center' justify='center' spacing={ 2 }>
          <Grid item xs={ 12 }>
            <TextField fullWidth
                       required
                       name={buildName('razaoSocial')}
                       label='Razão social'
            />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth
                       required
                       name={buildName('documento')}
                       label='CNPJ'
            />

          </Grid>
          <Grid item xs={12}>
            <DatePicker
              required
              disableFuture
              name={buildName('dataAbertura')}
              openTo="year"
              format="dd/MM/yyyy"
              label="Data de abertura"
              views={ ['year', 'month', 'date'] }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth
                       required
                       name={buildName('nitPisPasep')}
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

export default React.memo(DadosEmpresariaisStep);
