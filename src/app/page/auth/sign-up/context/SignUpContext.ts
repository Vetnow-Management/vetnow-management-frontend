import React from 'react';
import { FormCadastroStore, StepperStore } from '../store';

interface ISignUpContext {
  stepperStore: StepperStore,
  cadastroStore: FormCadastroStore,
}

export const defaultValueSignUpContext = {
  stepperStore: new StepperStore(),
  cadastroStore: new FormCadastroStore(),
};

const signUpContext = React.createContext<ISignUpContext>(
  defaultValueSignUpContext,
);

export default signUpContext;
export const SignUpContextProvider = signUpContext.Provider;
