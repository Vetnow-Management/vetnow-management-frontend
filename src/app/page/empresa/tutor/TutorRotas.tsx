import React, {ReactElement} from "react";
import {Route, Switch} from 'react-router-dom';
import TutorConsultar from "./TutorConsultar";

export const TUTOR_PREFIXO: string = '/tutor';
export const TUTOR_CONSULTA: string = '/';

export default function TutorRotas(): ReactElement {
  return (
    <Switch>
      <Route path={TUTOR_CONSULTA}
             component={TutorConsultar}
      />
    </Switch>
  )
}
