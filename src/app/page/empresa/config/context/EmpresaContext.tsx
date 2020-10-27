import React, { createContext, ReactElement, ReactNode, useContext } from 'react';

import { EmpresaStore } from '../store';
import useAppContext, { IAppContext } from '../../../../AppContext';

type IDefaultValueEmpresaContext = {
  empresaStore: EmpresaStore,
}

const EMPRESA_CONTEXT_VALUE: Readonly<IDefaultValueEmpresaContext> = Object.freeze({
    empresaStore: new EmpresaStore(),
  }
);

const empresaContext = createContext(EMPRESA_CONTEXT_VALUE);

export default function useEmpresaContext(): IDefaultValueEmpresaContext & IAppContext {
  const empresa = useContext(empresaContext);
  const app = useAppContext();

  return { ...empresa, ...app };
}

export function EmpresaContextProvider({ children }: {children: ReactNode}): ReactElement {
  const { Provider } = empresaContext;

  return (
    <Provider value={EMPRESA_CONTEXT_VALUE}>
      {children}
    </Provider>
  )
}
