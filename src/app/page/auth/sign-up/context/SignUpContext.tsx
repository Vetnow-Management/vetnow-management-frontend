import React, { ReactElement, ReactNode, useContext } from 'react';
import { StepperStore } from '../store';

interface ISignUpContext {
  stepperStore: StepperStore,
}

const defaultValueSignUpContext: ISignUpContext = {
  stepperStore: new StepperStore(),
};

const signUpContext = React.createContext<ISignUpContext>(
  defaultValueSignUpContext,
);

export default function useSignUpStore() {
  return useContext(signUpContext)
}

export function SignUpContextProvider({ children }: {children: ReactNode}): ReactElement {
  const { Provider } = signUpContext;

  return (
    <Provider value={defaultValueSignUpContext}>
      {children}
    </Provider>
  )
}
