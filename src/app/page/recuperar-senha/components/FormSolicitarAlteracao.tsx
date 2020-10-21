import React, {ReactElement} from "react";
import {Button, Grid} from "@material-ui/core";
import {makeValidate, TextField} from "mui-rff";
import {Form} from "react-final-form";
import {UsuarioRestService} from "../../../service/usuario";
import {makeStyles} from "@material-ui/core/styles";
import useAppContext from "../../../AppContext";
import {finalize} from "rxjs/operators";
import {SOLICITAR_SENHA} from "../validation-schema";

const useStyles = makeStyles({
  root: {
    marginTop: 50
  }
});

export default function FormSolicitarAlteracao(): ReactElement {

  const classes = useStyles();
  const validacoes = makeValidate(SOLICITAR_SENHA);
  const {
    snackBarStore: {mostrarSucesso},
    blockUIStore: {
      togglePipeable,
      naoMostrar
    }
  } = useAppContext();

  function solicitarAlteracaoSubmit(usuario: any): void {
    const {email} = usuario;
    UsuarioRestService.solicitarAlteracaoSenha(email as string)
      .pipe(togglePipeable, finalize(naoMostrar))
      .subscribe(() => mostrarSucesso(`Enviamos um e-mail recuperação para ${email}`));
  }

  return (
    <Form
      onSubmit={solicitarAlteracaoSubmit}
      validate={validacoes}
      render={({handleSubmit}) => (
        <form style={{display: 'flex', alignItems: 'center'}} onSubmit={handleSubmit}>
          <Grid container className={classes.root} item xs={12} justify='center'>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              spacing={1}
              item
              xs={12} md={5} sm={2}
            >
              <>
                <Grid container item>
                  <TextField fullWidth
                             name='email'
                             label="E-mail"
                  />
                </Grid>
                <Grid container item>
                  <Button fullWidth
                          variant='contained'
                          color='primary'
                          type='submit'
                  >
                    Solicitar
                  </Button>
                </Grid>
              </>
            </Grid>
          </Grid>
        </form>
      )}
    />
  );
}
