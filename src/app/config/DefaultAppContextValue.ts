import { IAppContext } from '../AppContext';
import { BlockUIStore, SnackBarStore, NotificacoesStore } from '../store';

const DefaultAppContextValue: Readonly<IAppContext> = Object.freeze({
  blockUIStore: new BlockUIStore(),
  snackBarStore: new SnackBarStore(),
  notificacoesStore: new NotificacoesStore(),
});

export default DefaultAppContextValue;
