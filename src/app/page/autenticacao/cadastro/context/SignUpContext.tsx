import React, { ReactElement, ReactNode, useContext } from 'react';

import { StepperStore } from '../store';
import useAppContext, { IAppContext } from '../../../../AppContext';

interface ICadastroContext {
  stepperStore: StepperStore,
}

const defaultValueSignUpContext: ICadastroContext = {
  stepperStore: new StepperStore(),
};

const cadastroContext = React.createContext<ICadastroContext>(
  defaultValueSignUpContext,
);

export default function useCadastroContext(): ICadastroContext & IAppContext {
  const signUp = useContext<ICadastroContext>(cadastroContext);
  const app = useAppContext();

  return { ...signUp, ...app };
}

export function SignUpContextProvider({ children }: {children: ReactNode}): ReactElement {
  const { Provider } = cadastroContext;

  return (
    <Provider value={defaultValueSignUpContext}>
      {children}
    </Provider>
  )
}
