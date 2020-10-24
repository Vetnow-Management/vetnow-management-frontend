import React, { ReactElement, useEffect, useState } from 'react';

import { observer } from 'mobx-react';
import { Form } from 'react-final-form'
import { Grid } from '@material-ui/core';
import { finalize } from 'rxjs/operators';
import { get as _get, set as _set } from 'lodash-es';
import { ValidationError as YupValidationError } from 'yup';

import { Steps } from './steps';
import { SignUpFooter } from './footer';
import StepperSignUp from './stepper/StepperSignUp';
import { NomesFormularioSistema } from '../../../domain';
import { SaveForm, WithMargin } from '../../../component';
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

function CadastroForm(): ReactElement {
  const formStateFromDB = useBackupFormState<Cadastro>(NomesFormularioSistema.CADASTRO_INICIAL);
  const {
    blockUIStore: {
      toggle: toggleBlockUI,
      togglePipeable: toggleBlockUIPipeable,
    },
    snackBarStore,
  } = useSignUpContext();

  const { irParaEntrar } = useRoutes();
  const [ valorInicial, setValorInicial ] = useState<Cadastro | undefined>(undefined);
  const [formErros, _setFormErros] = useState({
    isDadosPessoaisValid: false,
    isDadosUsuariosValid: false,
    isDadosEmpresariaisValid: false,
  });

  useEffect(() => {
    formStateFromDB.obter().then((value) => {
      value.ifPresent((valuePresent) => {
        setValorInicial(valuePresent);
      })
    });
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
            <Form<Cadastro> onSubmit={ onSubmit }
                            validate={ validateForm }
                            initialValues={valorInicial}
                            mutators={{
                              setFieldTouched: (args, state, tools) => {
                                //fixme: arrumar, se criar outro form ele funciona
                                const [name, touched] = args
                                const field = state.fields[name]
                                if (field) {
                                  field.touched = !!touched
                                }
                              },
                            }}
                            render={ ({ handleSubmit }) => {
                              return (
                                <form noValidate onSubmit={ handleSubmit }>
                                  <SaveForm debounce={1000} formName={NomesFormularioSistema.CADASTRO_INICIAL}/>
                                  <Steps />
                                  <SignUpFooter formErros={formErros} />
                                </form>
                              );
                            } }
            />
          </WithMargin>
        </Grid>
      </Grid>
    </SignUpContextProvider>
  )
}

export default observer(CadastroForm);
