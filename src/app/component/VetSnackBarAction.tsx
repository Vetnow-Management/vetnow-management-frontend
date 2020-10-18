import React, { ReactNode } from 'react';
import { Button } from '@material-ui/core';
import { Consumer } from '@vetnow-management/essentials';

export default function VetSnackBarAction(
  key: string | number,
  podeMostrar: boolean,
  fecharSnackBar: Consumer<string | number>,
  ): ReactNode {

  if (!podeMostrar) return null;
  return (
    <Button style={{color: 'white'}}
            onClick={() => fecharSnackBar(key)}
    >
      Fechar
    </Button>
  );
}
