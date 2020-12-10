import {Button, createStyles, Grid, Theme} from "@material-ui/core";
import React, {ReactElement, useEffect, useState} from "react";
import Cliente from "../../../../service/pessoa/dominio/Cliente";
import VetBox from "../../../../component/VetBox";
import {TutorContextProvider, useTutorContext} from "../context";
import {makeStyles} from "@material-ui/core/styles";
import {useParams} from "react-router-dom";
import {PessoaRestService} from "../../../../service/pessoa";
import useAppContext from "../../../../AppContext";
import {finalize} from "rxjs/operators";
import {useBuilderInputName, useRoutes} from "../../../../hook";
import {Observable, of} from "rxjs";
import {DatePicker, makeValidate, TextField} from "mui-rff";
import TutorValidationSchema, {ITutor} from "../validation-schema/TutorValidationSchema";
import {Form} from "react-final-form";
import {Sanitizer, UnaryOperator} from "@vetnow-management/essentials";
import {VetMaskedTextField} from "../../../../component";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
  })
);

export default function TutorInformacoes(): ReactElement {

  const classes = useStyles();

  const {uuid} = useParams();
  const {irParaTutor} = useRoutes();
  const {tutorStore: {cliente, adicionarCliente, paginaCliente, adicionarClientesAtuais}} = useTutorContext();
  const buildNameContato = useBuilderInputName('contato');
  const buildNameEndereco = useBuilderInputName('endereco');
  const {
    snackBarStore: {mostrarErro, mostrarSucesso},
    blockUIStore: {
      togglePipeable,
      naoMostrar,
    }
  } = useAppContext();

  const validation = makeValidate(TutorValidationSchema);
  const [clienteAtual, setClienteAtual] = useState<ITutor>({});

  function error(mensagem: string): Observable<void> {
    return of(mostrarErro(mensagem));
  }

  function sucesso(mensagem: string): UnaryOperator<Observable<any>> {
    mostrarSucesso(mensagem);
    return observable => observable;
  }

  useEffect(() => {
    if (cliente) {
      setClienteAtual(cliente);
    } else {
      PessoaRestService.obterClientes(0, 1, uuid)
        .pipe(togglePipeable, finalize(naoMostrar))
        .subscribe(pagina => {
          const cliente = pagina.lista.find(c => c.uuid === uuid) as Cliente;
          if (!cliente) {
            error('Ooops, Não foi possível encontrar as informações do Tutor.')
            irParaTutor();
          }
          setClienteAtual(cliente);
        })
    }
  }, [uuid])

  function atualizar(cliente: ITutor) {
    PessoaRestService.atualizar(cliente)
      .pipe(togglePipeable, finalize(naoMostrar))
      .subscribe(clienteAtualizado => {
        adicionarCliente(clienteAtualizado);
        const novaLista = paginaCliente.lista.filter(c => c.uuid !== clienteAtualizado.uuid);
        adicionarClientesAtuais({...paginaCliente, lista: [...novaLista, clienteAtualizado]})
        sucesso('Shooow, As informações foram atualizadas com sucesso!')
      }, error => error('Ooops, Não foi possível atualizar as informações do Tutor.'));
  }

  return (
    <Form onSubmit={atualizar}
          initialValues={clienteAtual}
          validate={validation}
          render={({handleSubmit}) => (
            <form onSubmit={handleSubmit}>
              <TutorContextProvider>
                <div className={classes.root}>
                  <VetBox titulo={'Informações'}>
                    <Grid container spacing={1}>
                      <Grid item xs={12}>
                        <Grid container spacing={1}>
                          <Grid item xs={12} md={4}>
                            <TextField
                              required
                              variant="standard"
                              name='nome'
                              size={"small"}
                              fullWidth
                              label="Nome"
                            />
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <DatePicker
                              required
                              disableFuture
                              name='dtNascimento'
                              openTo="year"
                              format="dd/MM/yyyy"
                              label="Data de nascimento"
                              views={['year', 'month', 'date']}
                            />
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <VetMaskedTextField fullWidth
                                                required
                                                name='documento'
                                                label='Documento'
                                                mascara='cpf'
                                                disabled
                                                fieldProps={{
                                                  parse: Sanitizer.cpf,
                                                }}
                            />
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <TextField
                              required
                              variant="standard"
                              name='contato.email'
                              size={"small"}
                              fullWidth
                              label="E-mail"
                              // disabled
                            />
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <VetMaskedTextField fullWidth
                                                required
                                                name={buildNameContato('celular')}
                                                label="Celular"
                                                mascara='celular'
                            />
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <VetMaskedTextField fullWidth
                                                name={buildNameContato('telefone')}
                                                label="Telefone"
                                                mascara='telefone'
                            />
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <VetMaskedTextField fullWidth
                                                required
                                                name={buildNameEndereco('cep')}
                                                label="CEP"
                                                mascara='cep'
                                                fieldProps={{
                                                  parse: Sanitizer.phoneNumber,
                                                }}
                            />
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <TextField
                              required
                              variant="standard"
                              name={buildNameEndereco('logradouro')}
                              size={"small"}
                              fullWidth
                              label="Logradouro"
                            />
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <TextField
                              required
                              variant="standard"
                              name={buildNameEndereco('bairro')}
                              size={"small"}
                              fullWidth
                              label="Bairro"
                            />
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <TextField
                              required
                              variant="standard"
                              name={buildNameEndereco('localidade')}
                              size={"small"}
                              fullWidth
                              label="Localidade"
                            />
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <TextField
                              required
                              variant="standard"
                              name={buildNameEndereco('uf')}
                              size={"small"}
                              fullWidth
                              label="UF"
                            />
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <TextField
                              variant="standard"
                              name={buildNameEndereco('unidade')}
                              size={"small"}
                              fullWidth
                              label="Unidade"
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              variant="standard"
                              name={buildNameEndereco('complemento')}
                              size={"small"}
                              fullWidth
                              label="Complemento"
                            />
                          </Grid>
                          <Grid item container direction="row" justify="flex-end" alignItems="center">
                            <Grid item xs={12} md={2}>
                              <Button type={"submit"} variant={"contained"} color={"primary"} fullWidth>
                                Atualizar
                              </Button>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </VetBox>
                </div>
              </TutorContextProvider>
            </form>
          )}/>
  )
}
