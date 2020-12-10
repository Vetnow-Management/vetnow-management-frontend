import {useHistory} from 'react-router-dom';
import {Consumer, Runnable} from '@vetnow-management/essentials';

import {DASHBOARD_ROTA, EMPRESA_PREFIXO} from '../page/empresa';
import {CADASTRO_ROTA, ENTRAR_ROTA} from '../page/autenticacao';
import {RECUPERAR_SENHA_PREFIXO} from '../page/recuperar-senha';
import {useEmpresaContext} from "../page/empresa/config/context";
import {TUTOR_ROTA} from "../page/empresa/EmpresaRotas";

interface IUseRoutes {
  irParaCadastro: Runnable,
  irParaEntrar: Runnable,
  irParaDashboard: Consumer<string>,
  irParaEmpresa: Runnable,
  irParaSolicitarAlteracao: Runnable,
  irParaTutor: Runnable,
}

export function useRoutes(): IUseRoutes {
  const history = useHistory();

  const {empresaStore: {uuidEmpresa}} = useEmpresaContext();

  return {
    irParaCadastro: () => history.push(CADASTRO_ROTA),
    irParaEntrar: () => history.push(ENTRAR_ROTA),
    irParaEmpresa: () => history.push(EMPRESA_PREFIXO),
    irParaDashboard: (uuidEmpresa) => history.push(
      DASHBOARD_ROTA
        .replace('uuid', uuidEmpresa)
        .replace(':', '')
    ),
    irParaSolicitarAlteracao: () => history.push(RECUPERAR_SENHA_PREFIXO),
    irParaTutor: () => history.push(TUTOR_ROTA
      .replace('uuid', uuidEmpresa as string)
      .replace(':', '')),
  };
}
