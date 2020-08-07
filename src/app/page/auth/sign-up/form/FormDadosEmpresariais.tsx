import React, { ReactElement } from 'react';

import { Grid } from '@material-ui/core';
import { TextField } from 'mui-rff';

import { FormContainer, FormContato, FormEndereco } from './components';

function FormDadosEmpresariais(): ReactElement {
  function getName(name: string): string {
    return `empresa.${name}`;
  }

  console.log('RENDER - FDE');
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
            <TextField fullWidth
                       required
                       name={getName('dataAbertura')}
                       label='Data de abertura'
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
      <FormContato objeto='empresa' />
      <FormEndereco objeto='empresa' />
    </>
  );
}

export default React.memo(FormDadosEmpresariais);
