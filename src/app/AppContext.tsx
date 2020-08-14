import React, { ReactElement } from 'react';

import { BlockUIStore } from './store';

export interface IAppContext {
  blockUIStore: BlockUIStore,
}

const DEFAULT_VALUE_APP_CONTEXT: IAppContext = Object.freeze({
  blockUIStore: new BlockUIStore(),
});

const appContext = React.createContext<IAppContext>(
  DEFAULT_VALUE_APP_CONTEXT,
);

export default function useAppContext(): IAppContext {
  return React.useContext<IAppContext>(appContext);
}

export function AppContextProvider({ children }: { children: React.ReactNode }): ReactElement {
  const { Provider } = appContext;

  return (
    <Provider value={DEFAULT_VALUE_APP_CONTEXT}>
      {children}
    </Provider>
  )
}
