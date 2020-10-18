import GitHubCommitResponse from './GitHubCommitResponse';

export default interface GitHubTagResponse {
  name: string;
  commit: GitHubCommitResponse;
  zipballUrl: string;
  tarballUrl: string;
  nodeId: string;
}
