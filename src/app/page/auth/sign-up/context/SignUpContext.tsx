import React, { ReactElement, ReactNode, useContext } from 'react';

import { BiConsumer, Supplier } from '@vetnow-management/essentials';

import { StepperStore } from '../store';
import useAppContext, { IAppContext } from '../../../../AppContext';
import { Cadastro } from '../../../../service/pessoa';

interface ISignUpContext {
  stepperStore: StepperStore,
  formularioCadastro: {
    setField: Supplier<BiConsumer<string, string>> | null,
    field: Cadastro | null,
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
