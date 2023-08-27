import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import GithubContext from '../context/github/GithubContext';

function User() {
  const { user, getUser } = useContext(GithubContext);
  const { login } = useParams();

  useEffect(() => {
    login && getUser(login);
  }, []);

  return user && <div>{user.login}</div>;
}

export default User;
