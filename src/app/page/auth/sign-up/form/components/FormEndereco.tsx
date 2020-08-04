import React, { ReactElement } from 'react';

import { Grid } from '@material-ui/core';
import { TextField } from 'mui-rff';
import { observer } from 'mobx-react';

import Target from '../../../../../Type/Target';
import { ViaCepService } from '../../../../../service';
import { FormContainer } from '.';

function FormEndereco({objeto}: {objeto?: string}): ReactElement {

  function getName(name: string): string {
    const root = `endereco.${name}`;

    if (objeto) return `${objeto}.${root}`;
    return root;
  }

  function onBlurCEP({ target: { value, name } }: Target) {
    console.log('V: ', value);
    console.log('N: ', name);
    // if (value.length >= 8) {
    //   ViaCepService.buscarCEP(value).subscribe(
    //     (res) => {
    //       Object.keys(res).map((key) => ({
    //           target: {
    //             name: key,
    //             // @ts-ignore: Ver pq ta quebrando
    //             value: res[key]
    //           },
    //         }
    //       )).forEach(setCamposEndereco)
    //     },
    //     (_) => {
    //     }
    //   )
    // }
  }

  return (
    <FormContainer>
      <Grid item container direction='row' alignItems='center' justify='center' spacing={2}>
        <Grid item xs={ 12 } sm={3}>
          <TextField fullWidth
                     required
                     name={getName('cep')}
                     label='CEP'
                     onBlur={ onBlurCEP }
          />
        </Grid>
        <Grid item xs={ 12 } sm={9}>
          <TextField fullWidth
                     required
                     // disabled
                     name={getName('logradouro')}
                     label='Logradouro'
          />
        </Grid>
        <Grid item xs={ 12 }>
          <TextField fullWidth
                     name={getName('complemento')}
                     label='Complemento'
          />
        </Grid>
        <Grid item xs={ 12 } sm={6}>
          <TextField fullWidth
                     required
                     // disabled
                     name={getName('bairro')}
                     label='Bairro'
          />
        </Grid>
        <Grid item xs={ 12 } sm={4}>
          <TextField fullWidth
                     required
                     // disabled
                     name={getName('localidade')}
                     label='Localidade'
          />
        </Grid>
        <Grid item xs={ 12 } sm={2}>
          <TextField fullWidth
                     required
                     // disabled
                     name={getName('uf')}
                     label='UF'
          />
        </Grid>
      </Grid>
    </FormContainer>
  )
}

export default observer(FormEndereco);
