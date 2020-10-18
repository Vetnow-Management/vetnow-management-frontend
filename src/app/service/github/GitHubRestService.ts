import { AbstractRestService } from '../AbstractRestService';
import { Environment } from '../../util';

class GitHubReposRestService extends AbstractRestService {
  public constructor() {
    super('repos', Environment.GIT_HUB_URL);
  }

  public obterTags() {
    return this.get('/Vetnow-Management/vetnow-management-frontend/tags')
  }
}

export default new GitHubReposRestService();
