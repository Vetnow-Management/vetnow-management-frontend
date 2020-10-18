import { Consumer, Predicate } from '@vetnow-management/essentials';
import { DefaultAppContextValue } from '../config';

export default function handleRequestError<T = any>(msg: string, mostrarMsgSomenteSe: boolean | Predicate<T> = true): Consumer<T> {
  return (err) => {
    const podeMostrarMsg = typeof mostrarMsgSomenteSe === 'function'
      ? mostrarMsgSomenteSe(err)
      : mostrarMsgSomenteSe;

    if (podeMostrarMsg) {
      DefaultAppContextValue.snackBarStore.showError(msg);
    }
  }
}
