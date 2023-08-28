import User from './user';
import Repo from './repo';

export type ACTIONTYPE =
  | { type: 'GET_USERS'; payload: User[] }
  | { type: 'GET_USER'; payload: User }
  | { type: 'GET_REPOS'; payload: Partial<Repo>[] }
  | { type: 'CLEAR_RESULTS' }
  | { type: 'SET_LOADING'; payload: boolean };
export interface GithubReducerType {
  users: User[];
  user: User | null;
  repos: Partial<Repo>[];
  loading: boolean;
}
export interface GithubContextType extends GithubReducerType {
  dispatch: React.Dispatch<ACTIONTYPE>;
}
