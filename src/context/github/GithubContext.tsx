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
  repos: [],
  loading: false,
  searchUsers: async () => {},
  getUser: async () => {},
  getRepos: async () => {},
  clearResults: () => {},
});

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }: { children: React.ReactNode }) => {
  const initialState: GithubReducerType = {
    users: [],
    user: null,
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  // Set loading to true
  const setLoadingToTrue = (): void => {
    dispatch({ type: 'SET_LOADING', payload: true });
  };

  // Search users
  async function searchUsers(text: string): Promise<void> {
    setLoadingToTrue();

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
  async function getUser(login: string) {
    setLoadingToTrue();

    const response = await fetch(`${GITHUB_URL}/users/${login}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    if (response.status === 404) {
      dispatch({ type: 'SET_LOADING', payload: false });

      throw new Response(
        JSON.stringify({ status: 404, message: 'User Not Found' }),
        {
          status: 404,
        }
      );
    } else {
      const data: User = await response.json();
      dispatch({ type: 'GET_USER', payload: data });
    }
  }

  // Get user repos
  async function getRepos(login: string) {
    setLoadingToTrue();

    const params = new URLSearchParams({ sort: 'created', per_page: '10' });

    const response = await fetch(
      `${GITHUB_URL}/users/${login}/repos?${params}`,
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
        },
      }
    );

    if (response.status === 404) {
      dispatch({ type: 'SET_LOADING', payload: false });

      throw new Response(
        JSON.stringify({ status: 404, message: 'Repos Not Found' }),
        {
          status: 404,
        }
      );
    } else {
      const data = await response.json();
      dispatch({ type: 'GET_REPOS', payload: data });
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
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        getUser,
        getRepos,
        clearResults,
      }}>
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
