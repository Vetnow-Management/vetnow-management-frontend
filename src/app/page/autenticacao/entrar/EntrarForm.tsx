import React, { ReactElement } from 'react';

import { observer } from 'mobx-react-lite';
import { useKeycloak } from '@react-keycloak/web';
import { Button, Grid, makeStyles } from '@material-ui/core';

import { useRoutes } from '../../../hook';
import { BtnCadastro } from '../../../component';

const useStyles = makeStyles({
  root: {
    height: 'inherit',
  }
});

function EntrarForm(): ReactElement {
  const classes = useStyles();
  const { irParaCadastro, irParaSolicitarAlteracao } = useRoutes();
  const { keycloak } = useKeycloak();

  function onLogin() {
    keycloak.login()
  }

  return (
    <Grid container className={ classes.root } item xs={12} alignItems='center' justify='center'>
      <Grid container
            item
            direction='column'
            alignItems='center'
            justify='center'
            xs={12}
            sm={7}
            md={5}
            spacing={1}
      >
        <Grid container item>
          <Button fullWidth
                  variant='contained'
                  color='primary'
                  onClick={ onLogin }
          >
            Acessar
          </Button>
        </Grid>
        <Grid container item>
          <BtnCadastro
            onClick={ irParaCadastro }
            descricao='EXPERIMENTE GRÁTIS'
          />
        </Grid>
        <Grid item container justify='flex-end'>
          <Button
            color='secondary'
            onClick={ irParaSolicitarAlteracao }
          >Esqueci minha senha.</Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default observer(EntrarForm);
