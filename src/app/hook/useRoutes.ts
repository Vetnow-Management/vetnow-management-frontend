import { useHistory } from 'react-router-dom';
import { Runnable } from '@vetnow-management/essentials';

import { SIGN_IN_PATH, SIGN_UP_PATH } from '../page/autenticacao';
import { DASHBOARD_PATH } from '../page/home';

interface IUseRoutes {
  goToSignUp: Runnable,
  goToSignIn: Runnable,
  goToDashboard: Runnable,
}
export function useRoutes(): IUseRoutes {
  const history = useHistory();

  return {
    goToSignUp: () => history.push(SIGN_UP_PATH),
    goToSignIn: () => history.push(SIGN_IN_PATH),
    goToDashboard: () => history.push(DASHBOARD_PATH),
  };
}
