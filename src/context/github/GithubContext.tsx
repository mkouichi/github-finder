import { createContext, useState } from 'react';
import User from '../../models/user';

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

export const GithubProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  async function fetchUsers(): Promise<void> {
    setLoading(true);

    const response = await fetch(`${GITHUB_URL}/users`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    const data: User[] = await response.json();

    setLoading(false);
    setUsers(data);
  }

  return (
    <GithubContext.Provider value={{ users, loading, fetchUsers }}>
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
