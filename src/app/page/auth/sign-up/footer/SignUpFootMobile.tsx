import React, { ReactElement } from 'react';

import { observer } from 'mobx-react';
import { Button } from '@material-ui/core';
import {
  DeleteForever as DeleteForeverIcon,
  NavigateBefore as NavigateBeforeIcon,
  NavigateNext as NavigateNextIcon,
  Save as SaveIcon
} from '@material-ui/icons';

import { VetFooter } from '../../../../component';
import { SignUpFooterProps } from './types';
import useSignUpFooterHelper from './useSignUpFooterHelper';

function SignUpFootMobile(props: SignUpFooterProps): ReactElement {
    const {
      classes,
      VetDialog,
      canSubmit,
      voltarStep,
      abrirDialog,
      proximoStep,
      currentStep,
      estaNoUltimoStep,
      isProximoButaoDisabled,
    } = useSignUpFooterHelper(props);

    return (
      <VetFooter>
        <VetDialog />
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
                disabled={ isProximoButaoDisabled() || estaNoUltimoStep }
        >
          <NavigateNextIcon />
        </Button>
        <Button color='secondary'
                variant='outlined'
                className={classes.marginButton}
                onClick={ abrirDialog }
        >
          <DeleteForeverIcon />
        </Button>
      </VetFooter>
    );
}

export default observer(SignUpFootMobile);
