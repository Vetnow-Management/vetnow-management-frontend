import React, { ReactElement, useEffect } from 'react';

import {
  Grid,
  Button,
} from '@material-ui/core';
import { observer } from 'mobx-react';

import StepperSignUp from './stepper/StepperSignUp';
import { LandingPagePaper, WithMargin } from '../../../component';
import { useStores } from '../../../hook';
import { FormDadosEmpresariais, FormDadosPagamentos, FormDadosPessoais } from './form';


function SignUp(): ReactElement {
  const {
    stepperStore: {
      stepsAvailable,
      currentStep,
      proximoStep,
      voltarStep,
    },
    cadastroStore: {
      dadosPessoais,
    },
  } = useStores();

  useEffect(() => {
    return () => dadosPessoais.limparCampos();
  }, []);

  function onSubmit(event): void {
    event.preventDefault();
    console.log('DATA: ', dadosPessoais);
  }

  function getForm(): ReactElement {
    switch (currentStep) {
      case 0: return <FormDadosPessoais />;
      case 1: return <FormDadosEmpresariais />;
      default: return <FormDadosPagamentos />;
    }
  }

  return (
    <LandingPagePaper
      renderLeftSide={() => <StepperSignUp currentStepper={currentStep} steps={stepsAvailable}/>}
      renderRightSide={() => (
        <WithMargin margin='10px'>
          <form noValidate onSubmit={ onSubmit }>
            { getForm() }
            <Grid item container direction='row' justify='flex-start' xs={8} spacing={2}>
              {currentStep === 2 && (
                <Grid item md={4}>
                  <Button fullWidth
                          type='submit'
                          variant='contained'
                          color='primary'
                  >
                    Salvar
                  </Button>
                </Grid>
              )}
              { currentStep < 2 && (
                <Grid item md={4}>
                  <Button fullWidth
                          variant='contained'
                          color='primary'
                          onClick={proximoStep}
                  >
                    Proximo
                  </Button>
                </Grid>
              )}
              {currentStep > 0 && (
                <Grid item md={4}>
                  <Button fullWidth
                          variant='outlined'
                          color='primary'
                          onClick={voltarStep}
                  >
                    Voltar
                  </Button>
                </Grid>
              )}
            </Grid>
          </form>
        </WithMargin>
      )}
    />
  )
}

export default observer(SignUp);
