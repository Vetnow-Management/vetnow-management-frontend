import React, {ReactElement} from "react";
import {Switch, useRouteMatch} from 'react-router-dom';
import TutorConsultar from "./components/TutorConsultar";
import {VetRoute} from "../../../component";
import {TutorInformacoes} from "./components";

export const TUTOR_PREFIXO: string = '/tutor';

export default function TutorRotas(): ReactElement {

  const {path} = useRouteMatch();

  return (
    <Switch>
      <VetRoute exact
                isProtect
                path={path}
                component={TutorConsultar}
      />
      <VetRoute isProtect
                path={`${path}/:uuid/informacoes`}
                component={TutorInformacoes}
      />
    </Switch>
  )
}
