import { makeStyles } from '@material-ui/core';

import { SignUpFooterProps } from './types';
import { useDialog } from '../../../../hook';
import { useSignUpContext } from '../context';

const useStyle = makeStyles({
  marginButton: {
    marginRight: 10,
  }
});

export default function useSignUpFooterHelper(props: SignUpFooterProps) {
  const {
    formErros,
  } = props;

  const {
    stepperStore: {
      currentStep,
      voltarStep,
      proximoStep,
      estaNoUltimoStep,
      irParaPrimeiroStep,
    },
    formularioCadastro: {
      resetForm,
    }
  } = useSignUpContext();

  const { VetDialog, abrirDialog } = useDialog({
    botaoRejeitarTexto: 'Cancelar',
    botaoAceitarTexto: 'Apagar',
    conteudo: 'Tem certeza que deja limpar todo formulario?',
    titulo: 'Limpar Formulario',
    aoAceitarCallBack: () => {
      limparForm();
      irParaPrimeiroStep();
    },
  });

  const classes = useStyle();

  const canSubmit = !(
    formErros.isDadosPessoaisValid &&
    formErros.isDadosEmpresariaisValid &&
    formErros.isDadosUsuariosValid);

  function isProximoButaoDisabled(): boolean {
    const {
      isDadosEmpresariaisValid,
      isDadosPessoaisValid,
      isDadosUsuariosValid
    } = formErros;

    if (currentStep === 0 && !isDadosPessoaisValid) return true;
    if (currentStep === 1 && !isDadosEmpresariaisValid) return true;
    return currentStep === 2 && !isDadosUsuariosValid;
  }

  function limparForm(): void {
    if (resetForm) resetForm();
  }

  const salvarToolTip = canSubmit
    ? 'Preencha todo formulario antes'
    : '';

  const proximoToolTip = isProximoButaoDisabled()
    ? 'Preencha o formulario atual antes'
    : '';

  return {
    classes,
    VetDialog,
    canSubmit,
    voltarStep,
    proximoStep,
    abrirDialog,
    currentStep,
    salvarToolTip,
    proximoToolTip,
    estaNoUltimoStep,
    irParaPrimeiroStep,
    isProximoButaoDisabled,
  }
}
