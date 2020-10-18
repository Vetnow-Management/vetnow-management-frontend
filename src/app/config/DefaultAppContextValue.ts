import { IAppContext } from '../AppContext';
import { BlockUIStore, SnackBarStore } from '../store';

const DefaultAppContextValue: Readonly<IAppContext> = Object.freeze({
  blockUIStore: new BlockUIStore(),
  snackBarStore: new SnackBarStore(),
});

export default DefaultAppContextValue;
