import React, { ReactElement } from 'react';

import { useSnackbar } from 'notistack';

import DefaultAppContextValue from './config/DefaultAppContextValue';
import { BlockUIStore, SnackBarStore, NotificacoesStore } from './store';

export interface IAppContext {
  blockUIStore: BlockUIStore,
  snackBarStore: SnackBarStore,
  notificacoesStore: NotificacoesStore,
}

const appContext = React.createContext<IAppContext>(
  DefaultAppContextValue,
);

export default function useAppContext(): IAppContext {
  return React.useContext<IAppContext>(appContext);
}

export function AppContextProvider({ children }: { children: React.ReactNode }): ReactElement {
  const { Provider } = appContext;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  DefaultAppContextValue.snackBarStore.snackBarStoreConfiguracao(
    enqueueSnackbar,
    closeSnackbar,
  );

  return (
    <Provider value={DefaultAppContextValue}>
      {children}
    </Provider>
  )
}
