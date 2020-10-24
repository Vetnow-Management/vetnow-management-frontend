import React, { FocusEvent, ReactElement, useEffect, useState } from 'react';

import { TextField } from 'mui-rff';
import { get as _get } from 'lodash-es';
import { finalize } from 'rxjs/operators';
import { useForm } from 'react-final-form';
import { Warning as WarningIcon } from '@material-ui/icons';
import { CircularProgress, Grid, InputAdornment, Tooltip } from '@material-ui/core';

import { FormContainer } from './index';
import { useBackupFormState } from '../../../../../hook';
import { handleRequestError } from '../../../../../util';
import { VetMaskedTextField } from '../../../../../component';
import { NomesFormularioSistema } from '../../../../../domain';
import { Cadastro, ViaCep, ViaCepRestService } from '../../../../../service';

export default function FormEndereco({ objeto }: { objeto?: string }): ReactElement {
  const { batch, change } = useForm();

  const [ estaCarregando, setEstaCarregando ] = useState<boolean>(false);
  const [ cepNaoEncontrado, setCepNaoEncontrado ] = useState<boolean>(false);
  const backupFormState = useBackupFormState<Cadastro>(NomesFormularioSistema.CADASTRO_INICIAL);

  function getName() {
    function get(name: string) {
      const root = `endereco.${ name }`;

      if (objeto) return `${ objeto }.${ root }`;
      return root;
    }

    return {
      uf: get('uf'),
      cep: get('cep'),
      bairro: get('bairro'),
      localidade: get('localidade'),
      logradouro: get('logradouro'),
      complemento: get('complemento'),
    }
  }

  function handleViaCepResponse(response: ViaCep | { erro: boolean }): void {
    // @ts-ignore: arrumar
    if (response?.erro) {
      setCepNaoEncontrado(true);
      const names = getName();
      batch(() => Object.keys(names)
        .filter(key => key !== 'cep')
        .forEach((key) => {
          // @ts-ignore: https://github.com/microsoft/TypeScript/issues/32321
          change(names[key], undefined);
        })
      )
    } else {
      setCepNaoEncontrado(false);
      const names = getName();
      batch(() => Object.keys(response)
        .forEach((resKeys) => {
          if (Object.prototype.hasOwnProperty.call(names, resKeys) ) {
            // @ts-ignore: https://github.com/microsoft/TypeScript/issues/32321
            change(names[resKeys], response[resKeys]);
          }
        })
      )
    }
  }

  function buscarCep(cep?: string): void {
    if (cep?.length === 9) {
      ViaCepRestService.buscarCEP(cep)
        .pipe(finalize(() => setEstaCarregando(false)))
        .subscribe(handleViaCepResponse, handleRequestError('Error ao buscar CEP'))
    }
  }

  function onBlurCEP({ target: { value } }: FocusEvent<HTMLInputElement>) {
    buscarCep(value);
  }

  useEffect(() => {
    backupFormState.obter()
      .then(form => form.ifPresent((p) => {
         const cep = _get(p, getName().cep, '');
         buscarCep(cep);
       })
      )
  }, []);

  const {
    uf,
    cep,
    bairro,
    localidade,
    logradouro,
    complemento,
  } = getName();

  return (
    <FormContainer>
      <Grid item container direction='row' alignItems='center' justify='center' spacing={ 2 }>
        <Grid item xs={ 12 } sm={ 3 }>
          <VetMaskedTextField fullWidth
                              required
                              label='CEP'
                              mascara='cep'
                              name={ cep }
                              onBlur={ onBlurCEP }
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position='end'>
                                    { estaCarregando && <CircularProgress size='20px' />}
                                    { cepNaoEncontrado && (
                                      <Tooltip title='CEP não encontrado'>
                                        <WarningIcon color='error'/>
                                      </Tooltip>
                                    )}
                                  </InputAdornment>
                                )
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
