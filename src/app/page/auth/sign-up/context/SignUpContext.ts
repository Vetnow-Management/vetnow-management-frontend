import React from 'react';
import { StepperStore } from '../store';

interface ISignUpContext {
  stepperStore: StepperStore,
}

export const defaultValueSignUpContext = {
  stepperStore: new StepperStore(),
};

const signUpContext = React.createContext<ISignUpContext>(
  defaultValueSignUpContext,
);

export default signUpContext;
export const SignUpContextProvider = signUpContext.Provider;
