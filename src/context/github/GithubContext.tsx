import { createContext, useReducer } from 'react';

import User from '../../models/user';
import {
  GithubContextType,
  GithubReducerType,
} from '../../models/githubContext';
import githubReducer from './GithubReducer';

const GithubContext = createContext<GithubContextType>({
  users: [],
  user: null,
  loading: false,
  searchUsers: async () => {},
  getUser: async () => {},
  clearResults: () => {},
});

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }: { children: React.ReactNode }) => {
  const initialState: GithubReducerType = {
    users: [],
    user: null,
    loading: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  const setLoading = (): void => {
    dispatch({ type: 'SET_LOADING' });
  };

  // Search users
  async function searchUsers(text: string): Promise<void> {
    setLoading();

    const params = new URLSearchParams({ q: text });

    const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    const { items }: { items: User[] } = await response.json();

    dispatch({ type: 'GET_USERS', payload: items });
  }

  // Get single user
  async function getUser(login: string): Promise<void> {
    setLoading();

    const response = await fetch(`${GITHUB_URL}/users/${login}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    if (response.status === 404) {
      console.log('User not found');
    } else {
      const data: User = await response.json();
      dispatch({ type: 'GET_USER', payload: data });
    }
  }

  // Clear users from state
  const clearResults = (): void => {
    dispatch({ type: 'CLEAR_RESULTS' });
  };

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        loading: state.loading,
        searchUsers,
        getUser,
        clearResults,
      }}>
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
