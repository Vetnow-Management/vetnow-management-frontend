import { useHistory } from 'react-router-dom';
import { Runnable } from '@vetnow-management/essentials';

import { ENTRAR_PATH, CADASTRO_PATH } from '../page/autenticacao';
import { DASHBOARD_PATH } from '../page/home';

interface IUseRoutes {
  irParaCadastro: Runnable,
  irParaEntrar: Runnable,
  goToDashboard: Runnable,
}
export function useRoutes(): IUseRoutes {
  const history = useHistory();

  return {
    irParaCadastro: () => history.push(CADASTRO_PATH),
    irParaEntrar: () => history.push(ENTRAR_PATH),
    goToDashboard: () => history.push(DASHBOARD_PATH),
  };
}
