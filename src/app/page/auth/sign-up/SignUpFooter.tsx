import React, { ReactElement } from 'react';

import { Button, makeStyles, Tooltip, useMediaQuery } from '@material-ui/core';
import {
  Save as SaveIcon,
  NavigateNext as NavigateNextIcon,
  NavigateBefore as NavigateBeforeIcon,
  DeleteForever as DeleteForeverIcon,
} from '@material-ui/icons';
import { observer } from 'mobx-react';

import { useSignUpContext } from './context';
import { VetFooter } from '../../../component';
import { useBreakpoints } from '../../../hook';

const useStyle = makeStyles({
  marginButton: {
    marginRight: 10,
  }
});

function SignUpFooter(props: SignUpFooterProps): ReactElement {
  const {
    formErros,
  } = props;

  const {
    stepperStore: {
      currentStep,
      stepsAvailable,
      proximoStep,
      voltarStep,
    },
  } = useSignUpContext();
  const canShowMobileButtons = useMediaQuery('(max-width:550px)');
  const classes = useStyle();

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

  const canSubmit = !(
    formErros.isDadosPessoaisValid &&
    formErros.isDadosEmpresariaisValid &&
    formErros.isDadosUsuariosValid);

  const salvarToolTip = canSubmit
    ? 'Preencha todo formulario antes'
    : '';

  const proximoToolTip = isProximoButaoDisabled()
    ? 'Preencha o formulario atual antes'
    : '';

  console.log('step: ', currentStep);
  if (canShowMobileButtons) {
    return (
      <VetFooter>
        <Button type='submit'
                color='primary'
                disabled={canSubmit}
                variant='contained'
                className={classes.marginButton}
        >
          <SaveIcon />
        </Button>
        <Button color='primary'
                variant='outlined'
                onClick={ voltarStep }
                disabled={ currentStep <= 0 }
                className={classes.marginButton}
        >
          <NavigateBeforeIcon />
        </Button>
        <Button color='primary'
                variant='outlined'
                onClick={ proximoStep }
                className={classes.marginButton}
                disabled={ isProximoButaoDisabled() || currentStep === stepsAvailable.length - 1 }
        >
          <NavigateNextIcon />
        </Button>
        <Button color='secondary'
                variant='outlined'
                className={classes.marginButton}
                onClick={ () => console.log('---IMPLEMENTAR O LIMPAR---') }
        >
          <DeleteForeverIcon />
        </Button>
      </VetFooter>
    )
  }
  return (
    <VetFooter>
      <Tooltip title={ salvarToolTip }
               className={ classes.marginButton }
      >
        <span>
          <Button type='submit'
                  variant='contained'
                  color='primary'
                  disabled={ canSubmit }
          >
            Salvar
          </Button>
        </span>
      </Tooltip>
      <Button variant='outlined'
              color='primary'
              onClick={ voltarStep }
              disabled={ currentStep <= 0 }
              className={ classes.marginButton }
      >
        Voltar
      </Button>
      <Tooltip title={ proximoToolTip }
               className={ classes.marginButton }
      >
        <span>
          <Button color='primary'
                  variant='outlined'
                  onClick={ proximoStep }
                  disabled={ isProximoButaoDisabled() || currentStep === stepsAvailable.length - 1 }
          >
            Proximo
          </Button>
        </span>
      </Tooltip>
      <Button color='secondary'
              variant='outlined'
              className={classes.marginButton}
              onClick={ () => console.log('---IMPLEMENTAR O LIMPAR---') }
      >
        LIMPAR FORMULARIO
      </Button>
    </VetFooter>
  )
}

type SignUpFooterProps = {
  formErros: {
    isDadosPessoaisValid: boolean,
    isDadosEmpresariaisValid: boolean,
    isDadosUsuariosValid: boolean,
  },
}

export default observer(SignUpFooter);
