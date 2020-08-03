import React, { ReactElement, useContext } from 'react';

import { Sanitizer, Validation } from '@cade-tecnologia/essentials';
import { Grid, TextField } from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import { observer } from 'mobx-react';

import { signUpContext } from '../context';
import { FormContainer, FormContato, FormEndereco, } from './components';
import { MaskedTextField } from '../../../../component';
import { CondicaoReturn } from '../../../../mixin/FormStoreHelperMixin';
import Target from '../../../../Type/Target';

function FormDadosPessoais(): ReactElement {
  const {
    cadastroStore: {
      setCampo: setCamposCadastro,
      setCampoComCondicao: setCampoComCondicaoCadastro,
      erro,
      setErro,
      removeErro,
      setDtNascimento,
      nome,
      documento,
      dtNascimento,
      endereco,
      contato,
    },
  } = useContext(signUpContext);


  function podeAtribuirDocumento(doc: string): CondicaoReturn {
    const sanitized = Sanitizer.cpf(doc);

    return {
      podeAtribuir: (/^[0-9]*$/).test(sanitized),
      valorTratado: sanitized,
    };
  }

  function validarCPF({target: { value }}: Target): void {
    if (!Validation.isCPF(value)) {
      setErro({
        field: 'cpf',
        errorMessage: 'CPF Invalido'
      })
    } else {
      removeErro('cpf');
    }
  }

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
            <DatePicker
              required
              disableFuture
              openTo="year"
              format="dd/MM/yyyy"
              label="Data de nascimento"
              views={ ['year', 'month', 'date'] }
              value={ dtNascimento }
              onChange={ setDtNascimento }
            />
          </Grid>
          <Grid item xs={ 12 } sm={ 6 }>
            <MaskedTextField fullWidth
                             required
                             name='documento'
                             label='CPF'
                             value={ documento }
                             onBlur={validarCPF}
                             helperText={erro('cpf')}
                             error={!!erro('cpf')}
                             onChange={ setCampoComCondicaoCadastro(podeAtribuirDocumento) }
                             options={{
                               delimiters: ['.', '.', '-'],
                               blocks: [3, 3, 3, 2],
                               numericOnly: true,
                             }}
            />
          </Grid>
        </Grid>
      </FormContainer>
      <FormContato contatoStore={ contato }/>
      <FormEndereco enderecoStore={ endereco }/>
    </>
  );
}

export default observer(FormDadosPessoais)
