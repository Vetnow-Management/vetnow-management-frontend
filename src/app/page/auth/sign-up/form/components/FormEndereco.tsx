import React, { ReactElement } from 'react';

import { Grid, TextField } from '@material-ui/core';
import { observer } from 'mobx-react';

import { EnderecoStore } from '../../store';
import Target from '../../../../../Type/Target';
import { ViaCepService } from '../../../../../service';
import { FormContainer } from '.';

function FormEndereco({ enderecoStore }: { enderecoStore: EnderecoStore }): ReactElement {
  const {
    cep,
    logradouro,
    complemento,
    bairro,
    localidade,
    uf,
    setCampo: setCamposEndereco,
  } = enderecoStore;

  function onBlurCEP({ target: { value } }: Target) {
    if (value.length >= 8) {
      ViaCepService.buscarCEP(value).subscribe(
        (res) => {
          Object.keys(res).map((key) => ({
              target: {
                name: key,
                // @ts-ignore: Ver pq ta quebrando
                value: res[key]
              },
            }
          )).forEach(setCamposEndereco)
        },
        (_) => {
        }
      )
    }
  }

  return (
    <FormContainer>
      <Grid item container direction='row' alignItems='center' justify='center' spacing={2}>
        <Grid item xs={ 12 } sm={3}>
          <TextField fullWidth
                     required
                     name='cep'
                     label='CEP'
                     value={ cep }
                     onChange={ setCamposEndereco }
                     onBlur={ onBlurCEP }
          />
        </Grid>
        <Grid item xs={ 12 } sm={9}>
          <TextField fullWidth
                     required
                     disabled
                     name='logradouro'
                     label='Logradouro'
                     value={ logradouro }
                     onChange={ setCamposEndereco }
          />
        </Grid>
        <Grid item xs={ 12 }>
          <TextField fullWidth
                     name='complemento'
                     label='Complemento'
                     value={ complemento }
                     onChange={ setCamposEndereco }
          />
        </Grid>
        <Grid item xs={ 12 } sm={6}>
          <TextField fullWidth
                     required
                     disabled
                     name='bairro'
                     label='Bairro'
                     value={ bairro }
                     onChange={ setCamposEndereco }
          />
        </Grid>
        <Grid item xs={ 12 } sm={4}>
          <TextField fullWidth
                     required
                     disabled
                     name='localidade'
                     label='Localidade'
                     value={ localidade }
                     onChange={ setCamposEndereco }
          />
        </Grid>
        <Grid item xs={ 12 } sm={2}>
          <TextField fullWidth
                     required
                     disabled
                     name='uf'
                     label='UF'
                     value={ uf }
                     onChange={ setCamposEndereco }
          />
        </Grid>
      </Grid>
    </FormContainer>
  )
}

export default observer(FormEndereco);
