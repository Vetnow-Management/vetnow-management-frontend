import React, { ReactElement } from 'react';
import { useSignUpContext } from '../context';
import PlanosStep from './PlanosStep';
import DadosPessoaisStep from './DadosPessoaisStep';
import ChaveAcessoStep from './ChaveAcessoStep';
import DadosEmpresariaisStep from './DadosEmpresariaisStep';
import DadosPagamentoStep from './DadosPagamentoStep';
import DadosUsuarioStep from './DadosUsuarioStep';

export default function Steps(): ReactElement {
  const {
    stepperStore: {
      currentStep
    }
  } = useSignUpContext();

  switch (currentStep) {
    case 0:
      return <PlanosStep />;
    case 1:
      return <ChaveAcessoStep />;
    case 2:
      return <DadosPessoaisStep />;
    case 3:
      return <DadosEmpresariaisStep />;
    case 4:
      return <DadosUsuarioStep />;
    case 5:
      return <DadosPagamentoStep />
    default:
      throw new Error(`Step Index Not Supported - Index: ${currentStep}`)
  }
}
