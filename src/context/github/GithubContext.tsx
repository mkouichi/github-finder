import { createContext, useReducer } from 'react';

import User from '../../models/user';
import githubReducer from './GithubReducer';

interface GithubContextType {
  users: User[];
  loading: boolean;
  fetchUsers(): Promise<void>;
}

const GithubContext = createContext<GithubContextType>({
  users: [],
  loading: false,
  fetchUsers: async () => {},
});

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }: { children: React.ReactNode }) => {
  const initialState = {
    users: [],
    loading: true,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  async function fetchUsers(): Promise<void> {
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
