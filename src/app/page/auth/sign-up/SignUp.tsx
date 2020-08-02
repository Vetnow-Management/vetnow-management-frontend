import React, { ReactElement, useContext, useEffect } from 'react';

import {
  Grid,
  Button,
} from '@material-ui/core';
import { observer } from 'mobx-react';

import { SignUpContextProvider, defaultValueSignUpContext, signUpContext } from './context';
import StepperSignUp from './stepper/StepperSignUp';
import { LandingPagePaper, WithMargin } from '../../../component';
import { FormDadosEmpresariais, FormUsuario, FormDadosPessoais } from './form';
import ChaveAcessoDialog from './chave-acesso/ChaveAcesso';


function SignUp(): ReactElement {
  const {
    stepperStore: {
      currentStep,
      proximoStep,
      voltarStep,
    },
    cadastroStore,
  } = useContext(signUpContext);

  useEffect(() => {
    return () => cadastroStore.limparCampos();
  }, []);

  function onSubmit(event: any): void {
    event.preventDefault();
    console.log('DATA: ', cadastroStore);
  }

  function aoValidarChave(chave: string): void {
    cadastroStore.empresa.chave = {chave};
  }

  function getForm(): ReactElement {
    switch (currentStep) {
      case 0: return <FormDadosPessoais />;
      case 1: return <FormDadosEmpresariais />;
      default: return <FormUsuario />;
    }
  }

  return (
    <>
      <SignUpContextProvider value={defaultValueSignUpContext}>
        <ChaveAcessoDialog onSuccess={aoValidarChave}/>
        <LandingPagePaper
          smLeftSide={3}
          smRightSide={9}
          renderLeftSide={() => <StepperSignUp />}
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
      </SignUpContextProvider>
    </>
  )
}

export default observer(SignUp);
