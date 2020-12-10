import {Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {Create, Delete, Visibility} from "@material-ui/icons";
import React from "react";


export default function TutorInformacoesAnimais(){

  return (
    <Grid container item spacing={1}>
      <Grid item xs={12}>
        <TableContainer>
          <Table aria-label="simple table" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>Data Nascimento</TableCell>
                <TableCell>Sexo</TableCell>
                <TableCell align="center">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  Toddy
                </TableCell>
                <TableCell component="th" scope="row">
                  01/01/2020
                </TableCell>
                <TableCell component="th" scope="row">
                  Macho
                </TableCell>
                <TableCell align="center" scope="row">
                  <IconButton
                    size="small"
                    style={{color: '#e67e22'}}
                    onClick={() => {
                    }}>
                    <Visibility/>
                  </IconButton>
                  <IconButton size="small" color="primary">
                    <Create/>
                  </IconButton>
                  <IconButton size="small" style={{color: '#c0392b'}}>
                    <Delete/>
                  </IconButton>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Toddy
                </TableCell>
                <TableCell component="th" scope="row">
                  01/01/2020
                </TableCell>
                <TableCell component="th" scope="row">
                  Macho
                </TableCell>
                <TableCell align="center" scope="row">
                  <IconButton
                    size="small"
                    style={{color: '#e67e22'}}
                    onClick={() => {
                    }}>
                    <Visibility/>
                  </IconButton>
                  <IconButton size="small" color="primary">
                    <Create/>
                  </IconButton>
                  <IconButton size="small" style={{color: '#c0392b'}}>
                    <Delete/>
                  </IconButton>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Toddy
                </TableCell>
                <TableCell component="th" scope="row">
                  01/01/2020
                </TableCell>
                <TableCell component="th" scope="row">
                  Macho
                </TableCell>
                <TableCell align="center" scope="row">
                  <IconButton
                    size="small"
                    style={{color: '#e67e22'}}
                    onClick={() => {
                    }}>
                    <Visibility/>
                  </IconButton>
                  <IconButton size="small" color="primary">
                    <Create/>
                  </IconButton>
                  <IconButton size="small" style={{color: '#c0392b'}}>
                    <Delete/>
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  )
}
