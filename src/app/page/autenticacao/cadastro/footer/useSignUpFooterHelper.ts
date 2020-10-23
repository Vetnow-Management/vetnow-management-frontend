import { makeStyles } from '@material-ui/core';

import { useForm } from 'react-final-form';

import { SignUpFooterProps } from './types';
import { useSignUpContext } from '../context';
import { NomesFormularioSistema } from '../../../../domain';
import { useBackupFormState, useDialog } from '../../../../hook';

const useStyle = makeStyles({
  marginButton: {
    marginRight: 10,
  }
});

export default function useSignUpFooterHelper(props: SignUpFooterProps) {
  const {
    formErros,
  } = props;

  // @ts-ignore: todo: remover ts ignore quando esse PR gerar versao
  // pr: https://github.com/final-form/final-form/pull/374
  const { restart } = useForm();
  const { remover } = useBackupFormState(NomesFormularioSistema.CADASTRO_INICIAL);

  const {
    stepperStore: {
      currentStep,
      voltarStep,
      proximoStep,
      estaNoUltimoStep,
      irParaPrimeiroStep,
    }
  } = useSignUpContext();

  const { VetDialog, abrirDialog } = useDialog({
    botaoRejeitarTexto: 'Cancelar',
    botaoAceitarTexto: 'Apagar',
    conteudo: 'Tem certeza que deja limpar todo formulario?',
    titulo: 'Limpar Formulario',
    aoAceitarCallBack: async () => {
      restart({});
      await remover()
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
