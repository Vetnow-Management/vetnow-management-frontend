import React, { ReactElement, useContext } from 'react';
import { Grid, TextField } from '@material-ui/core';
import { observer } from 'mobx-react';
import { signUpContext } from '../context';
import { FormEndereco, FormContato, FormContainer, } from './components';

function FormDadosPessoais(): ReactElement {
  const {
    cadastroStore: {
      setCampo: setCamposCadastro,
      nome,
      documento,
      dtNascimento,
      endereco,
      contato,
    },
  } = useContext(signUpContext);


  return (
    <>
      <FormContainer>
        <Grid item container direction='row' alignItems='center' justify='center' spacing={ 2 }>
          <Grid item xs={ 12 }>
            <TextField fullWidth
                       required
                       name='nome'
                       label='Nome e sobrenome'
                       value={ nome }
                       onChange={ setCamposCadastro }
            />
          </Grid>
          <Grid item xs={ 12 } sm={ 6 }>
            <TextField fullWidth
                       required
                       label='Data de nascimento'
                       name='dtNascimento'
                       value={ dtNascimento }
                       onChange={ setCamposCadastro }
            />
          </Grid>
          <Grid item xs={ 12 } sm={ 6 }>
            <TextField fullWidth
                       required
                       name='documento'
                       label='Documento (CPF ou CNPJ)'
                       value={ documento }
                       onChange={ setCamposCadastro }
            />
          </Grid>
        </Grid>
      </FormContainer>
      <FormContato contatoStore={contato} />
      <FormEndereco enderecoStore={endereco} />
    </>
  );
}

export default observer(FormDadosPessoais)
