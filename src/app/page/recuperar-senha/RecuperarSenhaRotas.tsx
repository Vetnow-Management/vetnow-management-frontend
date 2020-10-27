import React, {ReactElement} from 'react';
import {Route, Switch,} from 'react-router-dom';
import {FormAlterarSenha, FormSolicitarAlteracao} from "./components";

export const RECUPERAR_SENHA_PREFIXO = '/recuperar-senha'

export default function RecuperarSenhaRotas(): ReactElement {
  return (
    <Switch>
      <Route
        path={`${RECUPERAR_SENHA_PREFIXO}/:token`}
        component={FormAlterarSenha}
      />
      <Route
        path={`${RECUPERAR_SENHA_PREFIXO}`}
        component={FormSolicitarAlteracao}
      />
    </Switch>
  )
}
