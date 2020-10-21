import React, {ReactElement} from 'react';
import {Route, Switch,} from 'react-router-dom';
import {FormAlterarSenha, FormSolicitarAlteracao} from "./components";

export const RECUPERAR_SENHA_PAGE_PREFIX: string = '/recuperar-senha'

export default function RecuperarSenhaRotas(): ReactElement {
  return (
    <Switch>
      <Route
        path={`${RECUPERAR_SENHA_PAGE_PREFIX}/:token`}
        component={FormAlterarSenha}
      />
      <Route
        path={`${RECUPERAR_SENHA_PAGE_PREFIX}`}
        component={FormSolicitarAlteracao}
      />
    </Switch>
  )
}
