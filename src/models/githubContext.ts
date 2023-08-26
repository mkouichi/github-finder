import User from './user';

export interface GithubReducerType {
  users: User[];
  loading: boolean;
}
export interface GithubContextType extends GithubReducerType {
  searchUsers: (text: string) => Promise<void>;
  clearResults: () => void;
}
