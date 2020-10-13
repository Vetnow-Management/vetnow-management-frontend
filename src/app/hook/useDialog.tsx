import React, { ReactElement, useState } from 'react';

import {
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button, PropTypes,
} from '@material-ui/core';
import { Runnable, RunnableImpl } from '@vetnow-management/essentials';

export default function useDialog(props?: UseDialogProps) {
  const {
    conteudo,
    titulo,
    aoAceitarCallBack = RunnableImpl,
    botaoAceitarTexto = 'Ok',
    botaoRejeitarTexto = 'Cancelar',
    aoRejeitarCallBack = RunnableImpl,
    botaoAceitarCor = 'primary',
    botaoRejeitarCor = 'primary'
  } = props ?? {};

  const [ isOpen, setIsOpen ] = useState<boolean>(false);
  const fullScreen = useMediaQuery('(max-width:550px)');

  function abrirDialog(): void {
    setIsOpen(true);
  }

  function fecharDialog(): void {
    setIsOpen(false);
  }

  function aoAceitar(): void {
    aoAceitarCallBack();
    fecharDialog();
  }

  function aoRejeitar(): void {
    aoRejeitarCallBack();
    fecharDialog();
  }

  function VetDialog(): ReactElement {
    return (
      <Dialog fullScreen={fullScreen}
              open={isOpen}
              onClose={fecharDialog}
              aria-labelledby="vetnow-dialog"
      >
        <DialogTitle id='vetnow-dialog-title'>
          { titulo }
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{ conteudo }</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={aoAceitar} color={botaoAceitarCor}>
            { botaoAceitarTexto }
          </Button>
          <Button autoFocus onClick={aoRejeitar} color={botaoRejeitarCor}>
            { botaoRejeitarTexto }
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  return {
    abrirDialog,
    fecharDialog,
    VetDialog,
  }
}

type UseDialogProps = {
  titulo?: string;
  conteudo: string;
  botaoAceitarTexto?: string;
  botaoAceitarCor?: PropTypes.Color;
  botaoRejeitarTexto?: string;
  botaoRejeitarCor?: PropTypes.Color;
  aoAceitarCallBack?: Runnable;
  aoRejeitarCallBack?: Runnable;
};
