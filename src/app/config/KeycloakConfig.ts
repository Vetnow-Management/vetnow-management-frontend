import Keycloak, { KeycloakInitOptions, KeycloakInstance } from 'keycloak-js';

import { Environment } from '../util';

// @ts-ignore: TS Reclamando do keycloak
// https://stackoverflow.com/questions/43623461/new-expression-whose-target-lacks-a-construct-signature-in-typescript
const keycloak: KeycloakInstance = new Keycloak({
  url: `${Environment.KEYCLOAK_URL}/auth`,
  realm: 'vetnow-management',
  clientId: 'vetnow-management-client'
});

export const keycloakOptions: KeycloakInitOptions = {
  onLoad: 'check-sso',
};

export default keycloak;
