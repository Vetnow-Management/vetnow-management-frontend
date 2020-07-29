import React, { ReactElement } from 'react';
import { Grid, TextField } from '@material-ui/core';
import { observer } from 'mobx-react';

function FormDadosEmpresariais(): ReactElement {
  return (
    <form noValidate>
      <Grid item container direction='row' alignItems='center' justify='center' spacing={2}>
        <Grid item md={12}>
          <TextField label='Nome Fantasia' fullWidth/>
        </Grid>
        <Grid item md={6}>
          <TextField label='Razao Socail' fullWidth/>
        </Grid>
        <Grid item md={6}>
          <TextField label='CNPJ' fullWidth/>
        </Grid>
      </Grid>
    </form>
  );
}

export default observer(FormDadosEmpresariais);
