import { Environment } from '../../util';
import { Observable } from 'rxjs';
import { GitHubTagResponse } from './dominio';
import { map } from 'rxjs/operators';
import AbstractRestService from '../AbstractRestService';

class GitHubReposRestService extends AbstractRestService {
  public constructor() {
    super('repos', Environment.GIT_HUB_URL);
  }

  public obterTags(): Observable<GitHubTagResponse> {
    return this.get<GitHubTagOriginalResponse>('/Vetnow-Management/vetnow-management-frontend/tags')
      .pipe(
        map((value) => ({
          zipballUrl: value.zipball_url,
          tarballUrl: value.tarball_url,
          nodeId: value.node_id,
          name: value?.name?.replace('v', ''),
          commit: value.commit,
        }))
      )
  }
}
type GitHubTagOriginalResponse =
  Pick<GitHubTagResponse, 'commit' | 'name'> &
  { zipball_url: string, tarball_url: string, node_id: string }

export default new GitHubReposRestService();
