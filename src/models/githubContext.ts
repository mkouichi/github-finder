import User from './user';

export interface GithubState {
  users: User[];
  loading: boolean;
}

export interface GithubContextType extends GithubState {
  searchUsers: (text: string) => Promise<void>;
  clearResults: () => void;
}
