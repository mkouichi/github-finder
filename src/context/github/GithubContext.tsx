import { createContext, useReducer } from 'react';

import User from '../../models/user';
import { GithubState, GithubContextType } from '../../models/githubContext';
import githubReducer from './GithubReducer';

const GithubContext = createContext<GithubContextType>({
  users: [],
  loading: false,
  searchUsers: async (text: string) => {},
  clearResults: () => {},
});

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }: { children: React.ReactNode }) => {
  const initialState: GithubState = {
    users: [],
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

  // Clear users from state
  const clearResults = (): void => {
    dispatch({ type: 'CLEAR_RESULTS' });
  };

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        searchUsers,
        clearResults,
      }}>
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
