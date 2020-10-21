import React, { FocusEvent, ReactElement } from 'react';

import { Grid } from '@material-ui/core';
import { TextField } from 'mui-rff';
import { observer } from 'mobx-react';

import { ViaCepRestService } from '../../../../../service';
import { FormContainer } from './index';
import { useSignUpContext } from '../../context';
import { MaskedTextField } from '../../../../../component';

function FormEndereco({ objeto }: { objeto?: string }): ReactElement {
  const { formularioCadastro: { setField } } = useSignUpContext();

  function getName() {
    function get(name: string) {
      const root = `endereco.${ name }`;

      if (objeto) return `${ objeto }.${ root }`;
      return root;
    }

    return {
      cep: get('cep'),
      logradouro: get('logradouro'),
      complemento: get('complemento'),
      bairro: get('bairro'),
      localidade: get('localidade'),
      uf: get('uf'),
    }
  }

  function onBlurCEP({ target: { value } }: FocusEvent<HTMLInputElement>) {
    if (value.length >= 8) {
      ViaCepRestService.buscarCEP(value).subscribe(
        (res) => {
          const names = getName();

          Object.keys(res)
            .forEach((resKeys) => {
              if (Object.prototype.hasOwnProperty.call(names, resKeys)) {
                // @ts-ignore: ignore
                setField()(names[resKeys], res[resKeys])
              }
            })
        },
        (_) => {}
      )
    }
  }

  const {
    cep,
    bairro,
    logradouro,
    complemento,
    localidade,
    uf,
  } = getName();
  return (
    <FormContainer>
      <Grid item container direction='row' alignItems='center' justify='center' spacing={ 2 }>
        <Grid item xs={ 12 } sm={ 3 }>
          <MaskedTextField fullWidth
                           required
                           name={ cep }
                           label='CEP'
                           onBlur={ onBlurCEP }
                           options={{
                             delimiter: '-',
                             blocks: [5, 3],
                             numericOnly: true
                           }}
          />
        </Grid>
        <Grid item xs={ 12 } sm={ 9 }>
          <TextField fullWidth
                     required
                     disabled
                     name={ logradouro }
                     label='Logradouro'
          />
        </Grid>
        <Grid item xs={ 12 }>
          <TextField fullWidth
                     name={ complemento }
                     label='Complemento'
          />
        </Grid>
        <Grid item xs={ 12 } sm={ 6 }>
          <TextField fullWidth
                     required
                     disabled
                     name={ bairro }
                     label='Bairro'
          />
        </Grid>
        <Grid item xs={ 12 } sm={ 4 }>
          <TextField fullWidth
                     required
                     disabled
                     name={ localidade }
                     label='Localidade'
          />
        </Grid>
        <Grid item xs={ 12 } sm={ 2 }>
          <TextField fullWidth
                     required
                     disabled
                     name={ uf }
                     label='UF'
          />
        </Grid>
      </Grid>
    </FormContainer>
  )
}

export default observer(FormEndereco);
