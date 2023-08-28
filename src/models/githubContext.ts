import User from './user';
import Repo from './repo';

export interface GithubReducerType {
  users: User[];
  user: User | null;
  repos: Partial<Repo>[];
  loading: boolean;
}
export interface GithubContextType extends GithubReducerType {
  searchUsers: (text: string) => Promise<void>;
  getUser: (login: string) => Promise<void>;
  getRepos: (login: string) => Promise<void>;
  clearResults: () => void;
}
