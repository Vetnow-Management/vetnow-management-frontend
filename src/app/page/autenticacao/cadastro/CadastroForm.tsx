import React, { ReactElement, useEffect, useState } from 'react';

import { observer } from 'mobx-react';
import { Form } from 'react-final-form'
import { Grid } from '@material-ui/core';
import { finalize } from 'rxjs/operators';
import { get as _get, set as _set } from 'lodash-es';
import { Optional } from '@vetnow-management/essentials';
import { ValidationError as YupValidationError } from 'yup';

import { Steps } from './steps';
import { SignUpFooter } from './footer';
import { useBackupFormState, useRoutes } from '../../../hook';
import StepperSignUp from './stepper/StepperSignUp';
import { NomesFormularioSistema } from '../../../domain';
import { SaveForm, WithMargin } from '../../../component';
import { Cadastro, PessoaRestService } from '../../../service';
import { handleRequestError, TypeSafeGuard } from '../../../util';
import { SignUpContextProvider, useSignUpContext } from './context';
import {
  DadosEmpresariaisValidationSchema,
  DadosPessoaisValidationSchema,
  DadosUsuarioValidationSchema,
  ICadastro
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

function CadastroForm(): ReactElement {
  const formStateFromDB = useBackupFormState<ICadastro>(NomesFormularioSistema.CADASTRO_INICIAL);
  const {
    formularioCadastro,
    blockUIStore: {
      toggle: toggleBlockUI,
      togglePipeable: toggleBlockUIPipeable,
    },
    snackBarStore,
  } = useSignUpContext();

  const { irParaEntrar } = useRoutes();

  const [formErros, _setFormErros] = useState({
    isDadosPessoaisValid: false,
    isDadosEmpresariaisValid: false,
    isDadosUsuariosValid: false,
  });

  useEffect(() => {
    if (formularioCadastro.setField) {
      formularioCadastro.setField()('tipoPessoa', 'RESPONSAVEL');
      formularioCadastro.setField()('usuario.perfil', 'ADMINISTRADOR');
      formStateFromDB.obter().then((value) => {
        Optional.from(value)
          .ifPresent((valuePresent) => {
            // @ts-ignore: Arrumar no util, colocar pra isso nunca ser null
            Object.keys(valuePresent)
              .forEach(key => {
                if(formularioCadastro.setField) {
                  // @ts-ignore: GGWP
                  formularioCadastro.setField()(key, valuePresent[key]);
                }
              })
          })
      })
    }
  }, []);

  function setFormErros(formName: 'isDadosPessoaisValid' | 'isDadosEmpresariaisValid' | 'isDadosUsuariosValid', value: boolean = true): void {
    if (formErros[formName] === value) return; // somente atualizar se necessario

    _setFormErros(prevState => ({
      ...prevState,
      [formName]: value,
    }));
  }

  async function validateForm(values: any) {
    async function validarDadosPessoais(): Promise<void> {
      await DadosPessoaisValidationSchema.validate(values, { abortEarly: false })
        .catch((err) => {
          setFormErros('isDadosPessoaisValid', false)
          return Promise.reject(err)
        })
      setFormErros('isDadosPessoaisValid');
    }

    async function validarDadosEmpresariais(): Promise<void> {
      await DadosEmpresariaisValidationSchema.validate(values, { abortEarly: false })
        .catch((err) => {
          setFormErros('isDadosEmpresariaisValid', false)
          return Promise.reject(err);
        })
      setFormErros('isDadosEmpresariaisValid');
    }

    async function validarDadosUsuario(): Promise<void> {
      await DadosUsuarioValidationSchema.validate(values, { abortEarly: false })
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
          snackBarStore.showSuccess('Cadastro realizado com sucesso');
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
            <Form<Cadastro> onSubmit={ onSubmit }
                  validate={ (validateForm) }
                  mutators={{
                    setField: (_, state, {changeValue}) =>
                      (fieldName: string, fieldValue: string) =>
                        changeValue(state, fieldName, () => fieldValue),
                  }}
                  render={ ({ handleSubmit, form, values }) => {
                    formularioCadastro.setField = form.mutators.setField
                    formularioCadastro.field = values;
                    formularioCadastro.resetForm = form.reset;
                    return (
                      <form noValidate onSubmit={ handleSubmit }>
                        <SaveForm debounce={1000} formName={NomesFormularioSistema.CADASTRO_INICIAL}/>
                        <Steps />
                        <SignUpFooter formErros={formErros} />
                      </form>
                    )
                  } }
            />
          </WithMargin>
        </Grid>
      </Grid>
    </SignUpContextProvider>
  )
}

export default observer(CadastroForm);
