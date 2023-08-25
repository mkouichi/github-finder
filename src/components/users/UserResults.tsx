import { useEffect, useState } from 'react';

import User from '../../models/user';
import UserItem from './UserItem';

function UserResults(): JSX.Element {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers(): Promise<void> {
    setLoading(true);

    const response = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users`, {
      headers: {
        Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
      },
    });

    const data: User[] = await response.json();

    setLoading(false);
    setUsers(data);
  }

  return loading ? (
    <span className='loading loading-bars loading-lg block mx-auto'></span>
  ) : (
    <div className='grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2'>
      {users.map((user) => (
        <UserItem key={user.id} user={user} />
      ))}
    </div>
  );
}

export default UserResults;
