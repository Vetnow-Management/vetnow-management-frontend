import { Optional, OptionalBiFunc, OptionalConsumer, Verify } from '@vetnow-management/essentials';
import { OptionsObject, SnackbarMessage, SnackbarKey, VariantType } from 'notistack';

import { VetSnackBarAction } from '../component';

export default class SnackBarStore {
  private enqueueSnackbar?: IEnqueueSnackbar
  private closeSnackbar?: ICloseSnackbar;

  // todo: Criar decorator pra fazer o bind.this
  public snackBarStoreConfiguration = (enqueueSnackbar: IEnqueueSnackbar, closeSnackbar: ICloseSnackbar): void => {
    if (Verify.isNullOrUndefined(this.enqueueSnackbar)) {
      this.enqueueSnackbar = enqueueSnackbar;
    } else {
      // eslint-disable-next-line no-console
      console.warn(`
        SnackBarStore#snackBarStoreConfiguration esta sendo chamado desnecessariamente,
        SnackBarStore ja foi configurada.\n
        enqueueSnackbar ja foi setado
      `);
    }

    if (Verify.isNullOrUndefined(this.closeSnackbar)) {
      this.closeSnackbar = closeSnackbar;
    } else {
      // eslint-disable-next-line no-console
      console.warn(`
        SnackBarStore#snackBarStoreConfiguration esta sendo chamado desnecessariamente,
        SnackBarStore ja foi configurada.\n
        closeSnackbar ja foi setado
      `);
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
            variant: variante,
            persist: variante === 'error',
            action: (key) => VetSnackBarAction(
              key,
              variante === 'error',
              this.fecharSnackBar,
              ),
            ...options,
          })
        },
        () => {
          // eslint-disable-next-line no-console
          console.warn(`
            Nao foi possivel mostrar SnackBar.\n
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

  private fecharSnackBar = (key: string | number): void => {
    Optional
      .from(this.closeSnackbar)
      .ifPresentOrElse(
        (closeSnackbarPresent) => closeSnackbarPresent(key),
        () => {
          // eslint-disable-next-line no-console
          console.warn(`
            Nao foi possivel fechar SnackBar.\n
            SnackBarStore nao foi inicializada corretamente.
            Tente chamar o metodo SnackBarStore#snackBarStoreConfiguration na root da aplicacao.
          `)
        }
      )
  }
}

type IEnqueueSnackbar = OptionalBiFunc<SnackbarMessage, OptionsObject, SnackbarKey>;
type ICloseSnackbar = OptionalConsumer<string | number | undefined>;
