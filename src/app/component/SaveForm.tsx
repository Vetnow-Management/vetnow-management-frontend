import React, { ReactElement, useEffect, useState } from 'react';

import { set } from 'idb-keyval';
import { FormSpy, FormSpyRenderProps } from 'react-final-form';

import { IndexDBConfig } from '../config';
import useAppContext from '../AppContext';
import { NomesFormularioSistema } from '../domain';


function SaveFormComponent(props: SaveFormComponent): ReactElement | null {
  const { debounce, values, formName } = props;
  const [ time, setTime ] = useState<NodeJS.Timeout | null>(null);
  const { snackBarStore: { showInfo, showError }} = useAppContext();

  useEffect(() => {
    if (time) clearTimeout(time);

    const timeOut = setTimeout(() => {
      set(formName, values, IndexDBConfig)
        .then(() => showInfo('Formulário salvo'))
        .catch((err) => {
          showError('Erro ao salvar formulário')
          // eslint-disable-next-line no-console
          console.error(`Erro ao salvar form no indexDB: ${err}`);
        })
    }, debounce);
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
