import React, {ReactElement, useEffect, useState} from "react";

import {Observable, of} from "rxjs";
import {Form} from "react-final-form";
import {finalize} from "rxjs/operators";
import {useParams} from "react-router-dom";
import {Button, Grid} from "@material-ui/core";
import {makeValidate, TextField} from "mui-rff";
import {makeStyles} from "@material-ui/core/styles";
import {UnaryOperator} from "@vetnow-management/essentials";

import {useRoutes} from "../../../hook";
import useAppContext from "../../../AppContext";
import {ALTERAR_SENHA, IAlterarSenha} from "../validation-schema";
import {
  JWTService,
  UsuarioRestService,
  ValidacaoRestService,
  TokenRecuperacaoInterface,
} from "../../../service";

const useStyles = makeStyles({
  root: {
    marginTop: 50
  }
});

export default function FormAlterarSenha(): ReactElement {

  const classes = useStyles();
  const params = useParams<{ token: string }>();
  const validacoes = makeValidate(ALTERAR_SENHA)
  const routes = useRoutes();

  const {
    snackBarStore: {mostrarSucesso, mostrarErro},
    blockUIStore: {
      togglePipeable,
      mostrar,
      naoMostrar,
    }
  } = useAppContext();

  const [usuario, setUsuario] = useState<string | null>(null);

  function alterarSenhaSubmit(usuario: IAlterarSenha): void {
    // @ts-ignore interface gerado pelo yup não reconhece
    UsuarioRestService.alterarSenha(usuario)
      .pipe(
        togglePipeable,
        sucesso('Shooow, estamos alterando sua senha.'),
        finalize(naoMostrar),)
      .subscribe(() => {
        routes.irParaEntrar();
        sucesso('Maravilhaaaa, o sua senha foi alterada.');
      }, () => error('Oops, ocorreu um erro ao alterar sua senha.'));
  }

  function error(mensagem: string): Observable<void> {
    return of(mostrarErro(mensagem));
  }

  function sucesso(mensagem: string): UnaryOperator<Observable<any>> {
    mostrarSucesso(mensagem);
    return observable => observable;
  }

  useEffect(() => {
    const tokenEncontrado: string = params.token;
    ValidacaoRestService.validarToken(tokenEncontrado)
      .pipe(
        togglePipeable,
        sucesso('Heeey, estamos validando seu algumas informações.'),
        finalize(naoMostrar),
      )
      .subscribe(() => sucesso('Obaaa, as suas informações se encontram válidas.'),
        () => {
          error('Ooops, a suas informações para recuperar sua senha estão inválidas,' +
            ' você pode realizar uma nova solicitação.');
          routes.irParaSolicitarAlteracao();
        });
  }, [])

  useEffect(() => {
    const tokenEncontrado = params.token as string;
    try {
      mostrar();
      const token = JWTService.decriptar<TokenRecuperacaoInterface>(tokenEncontrado);
      setUsuario(token?.recuperacao?.usuario);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    } finally {
      naoMostrar();
    }
  }, []);

  return (
    <Form
      onSubmit={alterarSenhaSubmit}
      initialValues={{usuario: usuario as string}}
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
                  <TextField
                    name='usuario'
                    fullWidth
                    label="Usuário"
                    disabled={true}
                  />
                </Grid>
                <Grid container item>
                  <TextField
                    name='senha'
                    fullWidth
                    label="Nova senha"
                    type="password"
                  />
                </Grid>
                <Grid container item>
                  <TextField
                    name='confirmarSenha'
                    fullWidth
                    label="Confirmar senha"
                    type="password"
                  />
                </Grid>
                <Grid container item>
                  <Button fullWidth
                          variant='contained'
                          color='primary'
                          type='submit'
                  >
                    Alterar
                  </Button>
                </Grid>
              </>
            </Grid>
          </Grid>
        </form>
      )}
    />
  )
}
