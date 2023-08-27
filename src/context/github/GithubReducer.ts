import User from '../../models/user';
import { GithubReducerType } from '../../models/githubContext';

type ACTIONTYPE =
  | { type: 'GET_USERS'; payload: User[] }
  | { type: 'GET_USER'; payload: User }
  | { type: 'CLEAR_RESULTS' }
  | { type: 'SET_LOADING' };

const githubReducer = (state: GithubReducerType, action: ACTIONTYPE) => {
  switch (action.type) {
    case 'GET_USERS':
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case 'GET_USER':
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case 'CLEAR_RESULTS':
      return {
        ...state,
        users: [] as User[],
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default githubReducer;
