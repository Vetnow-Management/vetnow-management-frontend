import {Button, Grid} from "@material-ui/core";
import {makeValidate, TextField} from "mui-rff";
import {PersonAdd, Search} from "@material-ui/icons";
import {Form} from "react-final-form";
import React from "react";
import {PessoaRestService} from "../../../../service/pessoa";
import {finalize} from "rxjs/operators";
import useAppContext from "../../../../AppContext";
import {Observable, of} from "rxjs";
import TutorPesquisaValidationSchema, {ITutorPesquisa} from "../validation-schema/TutorPesquisaValidationSchema";

export interface TutorPesquisarProps {
  informacoes: any
}

export default function TutorPesquisar(props: TutorPesquisarProps) {

  const {informacoes} = props;

  const {
    snackBarStore: {mostrarSucesso, mostrarErro},
    blockUIStore: {
      togglePipeable,
      mostrar,
      naoMostrar,
    }
  } = useAppContext();

  const validation = makeValidate(TutorPesquisaValidationSchema);

  function pesquisarCliente(informacao: ITutorPesquisa): void {
    // @ts-ignore interface gerado pelo yup não reconhece
    const {informacao: info} = informacao;
    PessoaRestService.obterClientes(0, 10, info)
      .pipe(togglePipeable, finalize(naoMostrar))
      .subscribe(response => informacoes(response), () => error('Oops, Ocorreu um erro ao buscar os tutores da sua empresa.'));
  }

  function error(mensagem: string): Observable<void> {
    return of(mostrarErro(mensagem));
  }

  return (
    <Form
      validate={validation}
      onSubmit={pesquisarCliente}
      render={({handleSubmit}) => (
        <form onSubmit={handleSubmit} style={{width: '100%'}}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={8}>
              <TextField
                variant="standard"
                name='informacao'
                size={"small"}
                fullWidth
                label="Nome, Telefone, Email ou Documento"
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <Button
                style={{backgroundColor: '#E17055'}}
                fullWidth
                size={"large"}
                variant={"contained"}
                color='primary'
                startIcon={<Search/>}
                type={"submit"}
              >
                Pesquisar
              </Button>
            </Grid>
            <Grid item xs={12} md={2}>
              <Button
                fullWidth
                size={"large"}
                variant={"contained"}
                color='primary'
                startIcon={<PersonAdd/>}
              >
                Novo
              </Button>
            </Grid>
          </Grid>
        </form>
      )}/>
  )
}
