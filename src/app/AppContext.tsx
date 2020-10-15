import React, { ReactElement } from 'react';

import { BlockUIStore } from './store';
import SnackBarStore from './store/SnackBarStore';
import { DefaultAppContextValue } from './config';
import { useSnackbar } from 'notistack';

export interface IAppContext {
  blockUIStore: BlockUIStore,
  snackBarStore: SnackBarStore,
}

const appContext = React.createContext<IAppContext>(
  DefaultAppContextValue,
);

export default function useAppContext(): IAppContext {
  return React.useContext<IAppContext>(appContext);
}

export function AppContextProvider({ children }: { children: React.ReactNode }): ReactElement {
  const { Provider } = appContext;
  const { enqueueSnackbar } = useSnackbar();

  DefaultAppContextValue.snackBarStore.snackBarStoreConfiguration(enqueueSnackbar);

  return (
    <Provider value={DefaultAppContextValue}>
      {children}
    </Provider>
  )
}
