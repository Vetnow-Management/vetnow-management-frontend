import React, { ReactElement } from 'react';
import { observer } from 'mobx-react';
import { Button, Tooltip } from '@material-ui/core';

import { VetFooter } from '../../../../component';
import { SignUpFooterProps } from './types';
import useSignUpFooterHelper from './useSignUpFooterHelper';

function SignUpFootDesktop(props: SignUpFooterProps): ReactElement {
    const {
      classes,
      VetDialog,
      canSubmit,
      voltarStep,
      proximoStep,
      currentStep,
      abrirDialog,
      salvarToolTip,
      proximoToolTip,
      estaNoUltimoStep,
      isProximoButaoDisabled,
    } = useSignUpFooterHelper(props);

    return (
      <VetFooter>
        <VetDialog />
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
                  disabled={ isProximoButaoDisabled() || estaNoUltimoStep }
          >
            Proximo
          </Button>
        </span>
        </Tooltip>
        <Button color='secondary'
                variant='outlined'
                className={classes.marginButton}
                onClick={ abrirDialog  }
        >
          LIMPAR FORMULARIO
        </Button>
      </VetFooter>
    );
}

export default observer(SignUpFootDesktop);
