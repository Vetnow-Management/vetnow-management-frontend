import {
  Verify,
  Runnable,
  Optional,
  OptionalBiFunc,
  OptionalConsumer,
} from '@vetnow-management/essentials';
import { OptionsObject, SnackbarMessage, SnackbarKey, VariantType } from 'notistack';

import { VetSnackBarAction } from '../component';

export default class SnackBarStore {
  private enqueueSnackbar?: IEnqueueSnackbar
  private closeSnackbar?: ICloseSnackbar;

  public snackBarStoreConfiguracao = (enqueueSnackbar: IEnqueueSnackbar, closeSnackbar: ICloseSnackbar): void => {
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

  public mostrarPadrao = (texto: string, opcoesPersonalizadas?: IOpcoesPersonalizadas): void => {
    this.mostrarSnackBar(texto, this.construirOptionalObject('default', opcoesPersonalizadas));
  }

  public mostrarInfo = (texto: string, opcoesPersonalizadas?: IOpcoesPersonalizadas): void => {
    this.mostrarSnackBar(texto, this.construirOptionalObject('info', opcoesPersonalizadas));
  }

  public mostrarSucesso = (texto: string, opcoesPersonalizadas?: IOpcoesPersonalizadas): void => {
    this.mostrarSnackBar(texto, this.construirOptionalObject('success', opcoesPersonalizadas))
  }

  public mostrarAlerta = (texto: string, opcoesPersonalizadas?: IOpcoesPersonalizadas): void => {
    this.mostrarSnackBar(texto, this.construirOptionalObject('warning', opcoesPersonalizadas))
  }

  public mostrarErro = (texto: string, opcoesPersonalizadas?: IOpcoesPersonalizadas): void => {
    this.mostrarSnackBar(texto, this.construirOptionalObject('error', opcoesPersonalizadas));
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

  private mostrarSnackBar = (texto: string, opcoes: OptionsObject): void => {
    Optional
      .from(this.enqueueSnackbar)
      .ifPresentOrElse(
        (enqueueSnackbarPresent) => enqueueSnackbarPresent(texto, opcoes),
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

  private construirOptionalObject = (variante: VariantType, opcoesPersonalizadas: IOpcoesPersonalizadas = {}): IOpcoesPersonalizadas => ({
    autoHideDuration: 5000,
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'left',
    },
    variant: variante,
    persist: variante === 'error',
    action: (key) => VetSnackBarAction(
      key,
      opcoesPersonalizadas?.textoBotao ?? 'Fechar',
      opcoesPersonalizadas?.mostrarBotao ?? variante === 'error',
      (key) => {
        this.fecharSnackBar(key);
        if (opcoesPersonalizadas?.aoClicarParaFecharSnackBar) opcoesPersonalizadas.aoClicarParaFecharSnackBar();
      },
    ),
    ...opcoesPersonalizadas,
  })
}

type IOpcoesPersonalizadas = {
  aoClicarParaFecharSnackBar?: Runnable;
  mostrarBotao?: boolean;
  textoBotao?: string;
} & OptionsObject;

type IEnqueueSnackbar = OptionalBiFunc<SnackbarMessage, OptionsObject, SnackbarKey>;
type ICloseSnackbar = OptionalConsumer<string | number | undefined>;
