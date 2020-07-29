import React, { ReactElement } from 'react';
import { Grid, TextField } from '@material-ui/core';
import { observer } from 'mobx-react';

function FormDadosPagamentos(): ReactElement {
  return (
    <form noValidate>
      <Grid item container direction='row' alignItems='center' justify='center' spacing={2}>
        <Grid item md={12}>
          <TextField label='Número do Cartão' fullWidth/>
        </Grid>
        <Grid item md={6}>
          <TextField label='Nome' fullWidth/>
        </Grid>
        <Grid item md={6}>
          <TextField label='PIN' fullWidth/>
        </Grid>
      </Grid>
    </form>
  );
}

export default observer(FormDadosPagamentos);
