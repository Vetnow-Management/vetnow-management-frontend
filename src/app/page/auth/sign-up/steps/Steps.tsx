import React, { ReactElement } from 'react';

import { useSignUpContext } from '../context';
import DadosPessoaisStep from './DadosPessoaisStep';
import DadosEmpresariaisStep from './DadosEmpresariaisStep';
import DadosUsuarioStep from './DadosUsuarioStep';

export default function Steps(): ReactElement {
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
