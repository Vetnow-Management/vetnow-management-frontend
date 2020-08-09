import React, { ReactElement } from 'react';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button,
} from '@material-ui/core';
import { Consumer, ConsumerImpl, RunnableImpl, Verify } from '@vetnow-management/essentials';
import { UtilsService } from '../../../../service';
import { useRoutes } from '../../../../hook';
import { Target } from '../../../../Type';

enum OnFailType {
  CANCELAR,
  CHAVE_INVALIDA,
  REQUEST,
  OUTRO_MOTIVO,
}

interface ChaveAcessoDialogProp {
  onSuccess: Consumer<string>,
  onFail: Consumer<OnFailType>,
}

export default function ChaveAcessoDialog({ onSuccess, onFail }: ChaveAcessoDialogProp): ReactElement {
  const [open, setOpen] = React.useState<boolean>(true);
  const [chave, setChave] = React.useState<string>('');
  const [formErr, setFormErr] = React.useState<boolean>(false);

  const { goToLandingPage } = useRoutes();

  function onClose(): void {
    setOpen(false);
    goToLandingPage();
  }

  function handleOnCancelar(): void {
    onFail(OnFailType.CANCELAR);
    onClose();
  }


  function onSuccessResponse(response: boolean): void {
    if (response) {
      setOpen(false);
      onSuccess(chave);
      return;
    }

    onFail(OnFailType.CHAVE_INVALIDA);
  }

  function onErrorResponse(err: any): void {
    onFail(OnFailType.REQUEST);
  }

  function aoEnviar(): void {
    if (formErr) return;

    UtilsService.validarChaveAcesso(chave)
      .subscribe(
        onSuccessResponse,
        onErrorResponse,
      )
  }

  function onBluer({ target: { value } }: Target): void {
    if (Verify.isBlank(value) || value.length < 5) {
      setFormErr(true);
      return;
    }

    setFormErr(false);
  }

  function aoMudar({ target: { value } }: Target): void {
    setChave(value);
  }

  return (
    <Dialog open={open} onClose={onClose} disableBackdropClick>
      <DialogTitle>Chave de Acesso</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Para realizar o cadastro informe uma chave de acesso valida
        </DialogContentText>
        <TextField
          autoFocus
          fullWidth
          margin='dense'
          id='id_chave_acesso-chave'
          label='Chave'
          type='text'
          name='chave'
          onBlur={onBluer}
          onChange={aoMudar}
        />
        {formErr && (
          <span style={{color: 'red', fontSize: '15px'}}>Chave invalida</span>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={aoEnviar} color='primary'>Enviar</Button>
        <Button onClick={handleOnCancelar} color='primary'>Cancelar</Button>
      </DialogActions>
    </Dialog>
  );
}

ChaveAcessoDialog.defaultProps = {
  onSuccess: RunnableImpl,
  onFail: ConsumerImpl,
}
