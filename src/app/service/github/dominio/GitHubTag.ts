export default interface GitHubTag {
  name: string
  commit: {
    sha: string;
    url: string;
  },
  zipball_url: string;
  tarball_url: string;
  node_id: string;
}
