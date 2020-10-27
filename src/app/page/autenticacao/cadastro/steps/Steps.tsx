import React, { ReactElement } from 'react';

import { observer } from 'mobx-react-lite';

import { useSignUpContext } from '../context';
import DadosUsuarioStep from './DadosUsuarioStep';
import DadosPessoaisStep from './DadosPessoaisStep';
import DadosEmpresariaisStep from './DadosEmpresariaisStep';

function Steps(): ReactElement {
  const {
    stepperStore: {
      currentStep
    }
  } = useSignUpContext();

  switch (currentStep) {
    case 0:
      return <DadosPessoaisStep />;
    case 1:
      return <DadosEmpresariaisStep />;
    case 2:
      return <DadosUsuarioStep />;
    default:
      throw new Error(`Step Index Not Supported - Index: ${currentStep}`)
  }
}

export default observer(Steps);
