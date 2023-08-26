import User from '../../models/user';
import { GithubState } from '../../models/githubContext';

type ACTIONTYPE =
  | { type: 'GET_USERS'; payload: User[] }
  | { type: 'SET_LOADING' };

const githubReducer = (state: GithubState, action: ACTIONTYPE) => {
  switch (action.type) {
    case 'GET_USERS':
      return {
        ...state,
        users: action.payload,
        loading: false,
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
