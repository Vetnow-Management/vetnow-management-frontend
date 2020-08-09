import { AbstractEnvironmentVariables } from '@vetnow-management/essentials';

class Environment extends AbstractEnvironmentVariables {
  public readonly APP_NAME: string = 'Veterinario';

  public readonly API_URL: string = this.getVariable('API_URL');

  public readonly PRIMARY_COLOR: string = '#7044ff';

  public readonly SECONDARY_COLOR: string = '#00e7c4';

  public constructor() {
    super('REACT_APP');
  }
}

export default new Environment();
