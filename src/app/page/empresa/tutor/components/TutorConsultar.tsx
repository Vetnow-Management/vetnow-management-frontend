import React, {ReactElement, useEffect, useState} from 'react';
import {
  createStyles,
  Grid,
  Hidden,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Theme
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {TutorContextProvider, useTutorContext} from "../context";
import {PessoaRestService} from "../../../../service/pessoa";
import Cliente, {Page} from "../../../../service/pessoa/dominio/Cliente";
import useAppContext from "../../../../AppContext";
import {Observable, of} from "rxjs";
import {UnaryOperator} from "@vetnow-management/essentials";
import {finalize} from "rxjs/operators";
import TutorPesquisar from "./TutorPesquisar";
import VetBox from "../../../../component/VetBox";
import {Divider} from "../../../../component";
import VetAcoesButton from "./VetAcoesButton";
import {observer} from "mobx-react-lite";
import {useHistory, useRouteMatch} from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    msgEmpresaSemTutor: {
      display: 'flex',
      width: '100%',
      height: 40,
      backgroundColor: '#F1F2F6',
      alignItems: 'center',
      justifyContent: 'center'
    },
    box: {
      backgroundColor: 'white',
      padding: 5,
      boxShadow: '-4px 6px 7px -5px rgba(0,0,0,0.14)'
    }
  }),
);

function TutorConsultar(): ReactElement | null {

  const classes = useStyles();

  const history = useHistory();
  const {url} = useRouteMatch();
  const {tutorStore: {adicionarClientesAtuais, paginaCliente}} = useTutorContext();
  const {
    snackBarStore: {mostrarSucesso, mostrarErro},
    blockUIStore: {
      togglePipeable,
      naoMostrar,
    }
  } = useAppContext();

  const [paginacaoPagina, setPaginacaoPagina] = useState<number>(0);
  const [paginacaoQuantidade, setPaginacaoQuantidade] = useState<number>(10);

  const {
    tutorStore: {
      adicionarCliente
    }
  } = useTutorContext();

  function pesquisarCliente(informacao: Page<Cliente>): void {
    adicionarClientesAtuais(informacao);
  }

  function error(mensagem: string): Observable<void> {
    return of(mostrarErro(mensagem));
  }

  function sucesso(mensagem: string): UnaryOperator<Observable<any>> {
    mostrarSucesso(mensagem);
    return observable => observable;
  }

  function handleChangePagina(event: React.MouseEvent<HTMLButtonElement> | null, newPagina: number): void {
    setPaginacaoPagina(newPagina);
  }

  function handleChangeQuantidadeLinhas(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    setPaginacaoPagina(0);
    setPaginacaoQuantidade(parseInt(event.target.value))
  }

  function visualizarCliente(cliente: Cliente): void {
    adicionarCliente(cliente);
    history.push(`${url}/${cliente.uuid}/informacoes`);
  }

  function inativarCliente(cliente: Cliente) {
    const {uuid} = cliente;
    PessoaRestService.inativar(uuid as string)
      .pipe(togglePipeable, finalize(naoMostrar))
      .subscribe(() => {
        const newClientes = paginaCliente!.lista.filter(c => c.documento !== cliente.documento);
        adicionarClientesAtuais({...paginaCliente, lista: newClientes});
        sucesso('Tutor excluido com sucesso')
      }, error => {
        error(error.erro);
      });
  }

  function obterTodosClientes(pagina: number, quantidade: number): void {
    PessoaRestService.obterClientes(pagina, quantidade)
      .pipe(togglePipeable, finalize(naoMostrar))
      .subscribe(response => {
          adicionarClientesAtuais({...response, quantidade});
        },
        () => error('Oops, Ocorreu um erro ao buscar os Tutores da sua empresa.'))
  }

  useEffect(() => {
    if (paginaCliente.lista.length === 0) {
      obterTodosClientes(paginaCliente.pagina, paginaCliente.quantidade);
    }
  }, [])

  useEffect(() => {
    if (paginacaoPagina !== 0) {
      obterTodosClientes(paginacaoPagina, paginacaoQuantidade);
    }
  }, [paginacaoPagina, paginacaoQuantidade])

  return (
    <TutorContextProvider>
      <div className={classes.root}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <VetBox titulo={'Tutores'}>
              <Grid item xs={12} style={{padding: 5, marginBottom: 10}}>
                <TutorPesquisar informacoes={pesquisarCliente}/>
              </Grid>
              <Divider/>
              <Grid item xs={12}>
                <TableContainer style={{borderRadius: 16}}>
                  <Table aria-label="simple table" stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell>Nome</TableCell>
                        <Hidden smDown>
                          <TableCell align="center">Telefone</TableCell>
                          <TableCell align="center">Documento</TableCell>
                          <TableCell align="center">Qtd. Animal</TableCell>
                        </Hidden>
                        <TableCell align="center" width={200}>Ações</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {paginaCliente?.lista.map((c, i) => (
                        <TableRow>
                          <TableCell component="th" scope="row">
                            {c.nome}
                          </TableCell>
                          <Hidden smDown>
                            <TableCell align="center">{c?.contato?.celular}</TableCell>
                            <TableCell align="center">{c.documento}</TableCell>
                            <TableCell align="center">{c.animais?.length}</TableCell>
                          </Hidden>
                          <TableCell align="center" scope="row">
                            <VetAcoesButton<Cliente> item={c}
                                                     excluir={inativarCliente}
                                                     visualizar={visualizarCliente}/>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TablePagination
                          rowsPerPageOptions={[5, 10, 15, {label: 'Todos', value: 999999999}]}
                          colSpan={5}
                          count={paginaCliente.totalPagina ?? 0}
                          rowsPerPage={paginacaoQuantidade}
                          labelRowsPerPage={'Quantidade por página: '}
                          page={paginacaoPagina}
                          onChangePage={handleChangePagina}
                          onChangeRowsPerPage={handleChangeQuantidadeLinhas}
                        />
                      </TableRow>
                    </TableFooter>
                  </Table>
                </TableContainer>
              </Grid>
            </VetBox>
          </Grid>
        </Grid>
      </div>
    </TutorContextProvider>
  )
}

export default observer(TutorConsultar);
