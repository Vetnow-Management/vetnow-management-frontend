import { useHistory } from 'react-router-dom';
import { Consumer, Runnable } from '@vetnow-management/essentials';

import { DASHBOARD_ROTA, EMPRESA_PREFIXO } from '../page/empresa';
import { ENTRAR_ROTA, CADASTRO_ROTA } from '../page/autenticacao';
import { RECUPERAR_SENHA_PREFIXO } from '../page/recuperar-senha';

interface IUseRoutes {
  irParaCadastro: Runnable,
  irParaEntrar: Runnable,
  irParaDashboard: Consumer<string>,
  irParaEmpresa: Runnable,
  irParaSolicitarAlteracao: Runnable,
}
export function useRoutes(): IUseRoutes {
  const history = useHistory();

  return {
    irParaCadastro: () => history.push(CADASTRO_ROTA),
    irParaEntrar: () => history.push(ENTRAR_ROTA),
    irParaEmpresa: () => history.push(EMPRESA_PREFIXO),
    irParaDashboard: (uuidEmpresa) => history.push(
      DASHBOARD_ROTA
        .replace('uuid', uuidEmpresa)
        .replace(':', '')
    ),
    irParaSolicitarAlteracao: () => history.push(RECUPERAR_SENHA_PREFIXO)
  };
}
