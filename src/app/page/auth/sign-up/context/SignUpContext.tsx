import React, { ReactElement, ReactNode, useContext } from 'react';
import { StepperStore } from '../store';
import { BiConsumer, Supplier } from '@vetnow-management/essentials';

interface ISignUpContext {
  stepperStore: StepperStore,
  formularioCadastro: {
    setField: Supplier<BiConsumer<string, string>> | null,
  },
}

const defaultValueSignUpContext: ISignUpContext = {
  stepperStore: new StepperStore(),
  formularioCadastro: {
    setField: null,
  },
};

const signUpContext = React.createContext<ISignUpContext>(
  defaultValueSignUpContext,
);

export default function useSignUpContext() {
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
