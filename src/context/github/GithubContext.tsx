import { createContext, useReducer } from 'react';

import User from '../../models/user';
import { GithubState, GithubContextType } from '../../models/githubContext';
import githubReducer from './GithubReducer';

const GithubContext = createContext<GithubContextType>({
  users: [],
  loading: false,
  fetchUsers: async () => {},
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

  // Get initial users (testing purposes)
  async function fetchUsers(): Promise<void> {
    setLoading();

    const response = await fetch(`${GITHUB_URL}/users`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    const data: User[] = await response.json();

    dispatch({ type: 'GET_USERS', payload: data });
  }

  return (
    <GithubContext.Provider
      value={{ users: state.users, loading: state.loading, fetchUsers }}>
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
