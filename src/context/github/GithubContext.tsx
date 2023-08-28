import { createContext, useReducer } from 'react';

import githubReducer from './GithubReducer';
import {
  GithubContextType,
  GithubReducerType,
} from '../../models/githubContext';

const GithubContext = createContext<GithubContextType>({
  users: [],
  user: null,
  repos: [],
  loading: false,
  dispatch: () => {},
});

export const GithubProvider = ({ children }: { children: React.ReactNode }) => {
  const initialState: GithubReducerType = {
    users: [],
    user: null,
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  return (
    <GithubContext.Provider value={{ ...state, dispatch }}>
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
