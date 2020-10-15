import { Optional, OptionalBiFunc, Verify } from '@vetnow-management/essentials';
import { OptionsObject, SnackbarMessage, SnackbarKey, VariantType } from 'notistack';

export default class SnackBarStore {
  private enqueueSnackbar?: OptionalBiFunc<SnackbarMessage, OptionsObject, SnackbarKey>;

  // todo: Criar decorator pra fazer o bind.this
  public snackBarStoreConfiguration = (enqueueSnackbar: OptionalBiFunc<SnackbarMessage, OptionsObject, SnackbarKey>): void => {
    if (Verify.isNullOrUndefined(this.enqueueSnackbar)) {
      this.enqueueSnackbar = enqueueSnackbar;
    } else {
      // eslint-disable-next-line no-console
      console.warn(`
        SnackBarStore#snackBarStoreConfiguration esta sendo chamado desnecessariamente,
        SnackBarStore ja foi configurada.
      `)
    }
  }

  // todo: Criar decorator pra fazer o bind.this
  public showToast = (texto: string, variante: VariantType = 'info', options: OptionsObject = {}): void => {
    Optional
      .from(this.enqueueSnackbar)
      .ifPresentOrElse(
        (enqueueSnackbarPresent) => {
          enqueueSnackbarPresent(texto, {
            autoHideDuration: 5000,
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left',
            },
            ...options,
            variant: variante,
          })
        },
        () => {
          // eslint-disable-next-line no-console
          console.warn(`
            SnackBarStore nao foi inicializada corretamente.
            Tente chamar o metodo SnackBarStore#snackBarStoreConfiguration na root da aplicacao.
          `)
        }
      )
  }

  // todo: Criar decorator pra fazer o bind.this
  public showDefault = (texto: string): void => {
    this.showToast(texto, 'default');
  }

  // todo: Criar decorator pra fazer o bind.this
  public showInfo = (texto: string): void => {
    this.showToast(texto, 'info');
  }

  // todo: Criar decorator pra fazer o bind.this
  public showSuccess = (texto: string): void => {
    this.showToast(texto, 'success')
  }

  // todo: Criar decorator pra fazer o bind.this
  public showWarning = (texto: string): void => {
    this.showToast(texto, 'warning')
  }

  // todo: Criar decorator pra fazer o bind.this
  public showError = (texto: string): void => {
    this.showToast(texto, 'error')
  }
}
