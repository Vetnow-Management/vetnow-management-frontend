import React, { ReactElement } from 'react';

import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { SIGN_IN_PATH } from '../../autenticacao';

export default function Dashboard(): ReactElement {
  const { push } = useHistory();

  return (
    <div>
      <h1>DASHBOARD</h1>
      <Button onClick={() => push(SIGN_IN_PATH)}>
        Voltar para Sign In
      </Button>
    </div>
  );
}
