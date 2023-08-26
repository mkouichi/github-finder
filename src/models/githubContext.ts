import User from './user';

export interface GithubState {
  users: User[];
  loading: boolean;
}

export interface GithubContextType extends GithubState {
  fetchUsers(): Promise<void>;
}
