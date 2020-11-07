import React, { ReactElement, useEffect, useState } from 'react';

import { Form, FormProps } from 'react-final-form';

import { SaveForm } from './index';
import useAppContext from '../AppContext';
import { useBackupFormState } from '../hook';
import { NomesFormularioSistema } from '../domain';

export default function VetForm<FormValues = Record<string, any>>(props: VetFormProps): ReactElement {
  const { snackBarStore: { mostrarAlerta }} = useAppContext();
  const { onSubmit, children, persistir, ...restProps } = props;
  const [ valorInicial, setValorInicial ] = useState<FormValues | undefined>(undefined);

  useEffect(() => {
    if (persistir) {
      useBackupFormState<FormValues>(persistir.formName)
        .obter()
        .then((value) => value.ifPresent(setValorInicial))
        .catch((err) => {
          mostrarAlerta('Erro ao obter seu formulario');
          // eslint-disable-next-line no-console
          console.error(err)
        })
    }
  }, []);

  return (
    <Form onSubmit={ onSubmit }
          initialValues={valorInicial}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit} noValidate>
              {persistir && <SaveForm debounce={persistir.debounce} formName={persistir.formName}/>}
              {children}
            </form>
          )}
          { ...restProps }
    />
  )
}

type VetFormProps<FormValues = Record<string, any>, InitialFormValues = Partial<FormValues>> = {
  persistir?: {
    debounce: number;
    formName: NomesFormularioSistema;
  };
} & FormProps<FormValues, InitialFormValues>;
