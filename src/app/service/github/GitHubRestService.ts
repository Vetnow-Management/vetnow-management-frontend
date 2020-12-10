import { Observable } from 'rxjs';

import { GitHubTag } from './dominio';
import { Environment } from '../../util';
import { AbstractRestService } from '../AbstractRestService';

class GitHubRestService extends AbstractRestService {
  public constructor() {
    super('repos', Environment.GIT_HUB_URL);
  }

  public obterTags(): Observable<GitHubTag[]> {
    return this.get<GitHubTag[]>('/Vetnow-Management/vetnow-management-frontend/tags')
  }
}

export default new GitHubRestService();
