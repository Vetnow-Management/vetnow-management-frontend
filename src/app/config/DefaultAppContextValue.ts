import { BlockUIStore } from '../store';
import SnackBarStore from '../store/SnackBarStore';
import { IAppContext } from '../AppContext';

const DefaultAppContextValue: Readonly<IAppContext> = Object.freeze({
  blockUIStore: new BlockUIStore(),
  snackBarStore: new SnackBarStore(),
});

export default DefaultAppContextValue;
