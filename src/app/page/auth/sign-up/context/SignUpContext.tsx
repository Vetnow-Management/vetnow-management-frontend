import React, { ReactElement, ReactNode, useContext } from 'react';

import { BiConsumer, Supplier } from '@vetnow-management/essentials';

import { StepperStore } from '../store';
import { ICadastro } from '../validation-schema';
import useAppContext, { IAppContext } from '../../../../AppContext';

interface ISignUpContext {
  stepperStore: StepperStore,
  formularioCadastro: {
    setField: Supplier<BiConsumer<string, string>> | null,
    field: ICadastro | null,
  },
}

const defaultValueSignUpContext: ISignUpContext = {
  stepperStore: new StepperStore(),
  formularioCadastro: {
    setField: null,
    field: null,
  },
};

const signUpContext = React.createContext<ISignUpContext>(
  defaultValueSignUpContext,
);

export default function useSignUpContext(): ISignUpContext & IAppContext {
  const signUp = useContext<ISignUpContext>(signUpContext);
  const app = useAppContext();

  return { ...signUp, ...app };
}

export function SignUpContextProvider({ children }: {children: ReactNode}): ReactElement {
  const { Provider } = signUpContext;

  return (
    <Provider value={defaultValueSignUpContext}>
      {children}
    </Provider>
  )
}
