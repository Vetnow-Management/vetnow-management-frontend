import React, { ReactElement, useState } from 'react';

import { Grid } from '@material-ui/core';
import { finalize } from 'rxjs/operators';
import { observer } from 'mobx-react-lite';
import { get as _get, set as _set } from 'lodash-es';
import { ValidateOptions, ValidationError as YupValidationError } from 'yup';

import { Steps } from './steps';
import { SignUpFooter } from './footer';
import StepperSignUp from './stepper/StepperSignUp';
import { NomesFormularioSistema } from '../../../domain';
import { VetForm, WithMargin } from '../../../component';
import { useBackupFormState, useRoutes } from '../../../hook';
import { Cadastro, PessoaRestService } from '../../../service';
import { handleRequestError, TypeSafeGuard } from '../../../util';
import { SignUpContextProvider, useSignUpContext } from './context';
import {
  DadosEmpresariaisValidationSchema,
  DadosPessoaisValidationSchema,
  DadosUsuarioValidationSchema,
} from './validation-schema';

function convertYupErrorsToFieldErrors(yupErrors: YupValidationError) {
  return yupErrors.inner.reduce((errors, { path, message }) => {
    if (_get(errors, path)) {
      _set(errors, path, _get(errors, path));
    } else {
      _set(errors, path, message);
    }
    return errors;
  }, {});
}

const YUP_VALIDATION_OPTIONS: ValidateOptions = { abortEarly: false, strict: true };

function CadastroForm(): ReactElement {
  const { irParaEntrar } = useRoutes();
  const formStateFromDB = useBackupFormState<Cadastro>(NomesFormularioSistema.CADASTRO_INICIAL);
  const {
    blockUIStore: {
      toggle: toggleBlockUI,
      togglePipeable: toggleBlockUIPipeable,
    },
    snackBarStore,
  } = useSignUpContext();

  const [formErros, _setFormErros] = useState({
    isDadosPessoaisValid: false,
    isDadosUsuariosValid: false,
    isDadosEmpresariaisValid: false,
  });

  function setFormErros(formName: 'isDadosPessoaisValid' | 'isDadosEmpresariaisValid' | 'isDadosUsuariosValid', value: boolean = true): void {
    if (formErros[formName] === value) return; // somente atualizar se necessario

    _setFormErros(prevState => ({
      ...prevState,
      [formName]: value,
    }));
  }

  async function validateForm(values: any) {
    async function validarDadosPessoais(): Promise<void> {
      await DadosPessoaisValidationSchema.validate(values, YUP_VALIDATION_OPTIONS)
        .catch((err) => {
          setFormErros('isDadosPessoaisValid', false)
          return Promise.reject(err)
        })
      setFormErros('isDadosPessoaisValid');
    }

    async function validarDadosEmpresariais(): Promise<void> {
      await DadosEmpresariaisValidationSchema.validate(values, YUP_VALIDATION_OPTIONS)
        .catch((err) => {
          setFormErros('isDadosEmpresariaisValid', false)
          return Promise.reject(err);
        })
      setFormErros('isDadosEmpresariaisValid');
    }

    async function validarDadosUsuario(): Promise<void> {
      await DadosUsuarioValidationSchema.validate(values, YUP_VALIDATION_OPTIONS)
        .catch((err) => {
          setFormErros('isDadosUsuariosValid', false);
          return Promise.reject(err);
        });
      setFormErros('isDadosUsuariosValid');
    }

    try {
      await validarDadosPessoais();
      await validarDadosEmpresariais();
      await validarDadosUsuario();
    } catch (err) {
      if (TypeSafeGuard().isValidationError((err))) {
        return convertYupErrorsToFieldErrors(err);
      }

      // eslint-disable-next-line no-console
      console.error(err)
      throw new Error('Err is not an ValidationError from Yup');
    }
  }

  function onSubmit(payload: Cadastro): void {
    PessoaRestService
      .cadastrarResponsavel(payload)
      .pipe(
        toggleBlockUIPipeable,
        finalize(toggleBlockUI),
      )
      .subscribe(
        async () => {
          snackBarStore.mostrarSucesso('Cadastro realizado com sucesso');
          irParaEntrar();
          await formStateFromDB.remover();
        },
        handleRequestError('Algo deu errado ao realizar seu cadastro')
      );
  }

  return (
    <SignUpContextProvider>
      <Grid container item style={{ height: 0 }}>
        <Grid container item alignItems='flex-start' xs={12}>
          <StepperSignUp />
        </Grid>
        <Grid container item alignItems='flex-start' xs={12}>
          <WithMargin margin='10px'>
            <VetForm onSubmit={ onSubmit }
                     validate={ validateForm }
                     persistir={{ formName: NomesFormularioSistema.CADASTRO_INICIAL, debounce: 1000  }}
            >
              <Steps />
              <SignUpFooter formErros={formErros} />
            </VetForm>
          </WithMargin>
        </Grid>
      </Grid>
    </SignUpContextProvider>
  )
}

export default observer(CadastroForm);
