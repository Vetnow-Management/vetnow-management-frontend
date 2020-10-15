import { useHistory } from 'react-router-dom';
import { Runnable } from '@vetnow-management/essentials';

import { SIGN_IN_PATH, SIGN_UP_PATH } from '../page/auth';
import { DASHBOARD_PATH } from '../page/home';
import { LANDING_PAGE_PREFIX } from '../page/landing-page';
import { RECOVERY_PASSWORD_PAGE_PREFIX } from "../page/recovery-password/RecoveryPasswordRoutes";

interface IUseRoutes {
  goToSignUp: Runnable,
  goToSignIn: Runnable,
  goToDashboard: Runnable,
  goToLandingPage: Runnable,
  goToRecoveryPasswordPage: Runnable,
}
export function useRoutes(): IUseRoutes {
  const history = useHistory();

  return {
    goToSignUp: () => history.push(SIGN_UP_PATH),
    goToSignIn: () => history.push(SIGN_IN_PATH),
    goToDashboard: () => history.push(DASHBOARD_PATH),
    goToLandingPage: () => history.push(LANDING_PAGE_PREFIX),
    goToRecoveryPasswordPage: () => history.push(RECOVERY_PASSWORD_PAGE_PREFIX)
  };
}
