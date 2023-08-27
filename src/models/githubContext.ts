import User from './user';

export interface GithubReducerType {
  users: User[];
  user: User | null;
  loading: boolean;
}
export interface GithubContextType extends GithubReducerType {
  searchUsers: (text: string) => Promise<void>;
  getUser: (login: string) => Promise<void>;
  clearResults: () => void;
}
