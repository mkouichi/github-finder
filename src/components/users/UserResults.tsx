import { useContext } from 'react';

import User from '../../models/user';
import GithubContext from '../../context/github/GithubContext';

import UserItem from './UserItem';

function UserResults(): JSX.Element {
  const { users, loading } = useContext(GithubContext);

  return loading ? (
    <span className='loading loading-bars loading-lg block mx-auto'></span>
  ) : (
    <div className='grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2'>
      {users.map((user: User) => (
        <UserItem key={user.id} user={user} />
      ))}
    </div>
  );
}

export default UserResults;
