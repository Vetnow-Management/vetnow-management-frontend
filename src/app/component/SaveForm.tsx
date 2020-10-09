import React from 'react';

import { set } from 'idb-keyval';

import { NomesFormularioSistema } from '../domain';
import { ReactElement, useEffect, useState } from 'react';
import { FormSpy, FormSpyRenderProps } from 'react-final-form';
import { IndexDBConfig } from '../config';

function realizarSave(formName: NomesFormularioSistema, formValues: Record<string, any>): void {
  set(formName, formValues, IndexDBConfig)
    .catch((err) => console.log('Erro: ', err))
}

function SaveFormComponent(props: SaveFormComponent): ReactElement | null {
  const { debounce, values, formName } = props;
  const [ time, setTime ] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (time) clearTimeout(time);

    const timeOut = setTimeout(() => realizarSave(formName, values), debounce);
    setTime(timeOut);

  }, [ values ]);

  return null;
}

export default function SaveForm(props: SaveFormProp): ReactElement {
  return (
    <FormSpy subscription={{ values: true }} render={
      (renderProps) => (<SaveFormComponent {...renderProps} {...props}/>)
    }/>
  )
}

type SaveFormProp = {
  formName: NomesFormularioSistema;
  debounce: number;
}

type SaveFormComponent =
  SaveFormProp &
  FormSpyRenderProps;

SaveForm.defaultProps = {
  debounce: 1000
} as Partial<SaveFormProp>;
