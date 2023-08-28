import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import GithubContext from '../context/github/GithubContext';
import NotFound from './NotFound';

function User() {
  const [notFound, setNotFound] = useState(false);
  const { user, getUser } = useContext(GithubContext);
  const { login } = useParams();

  useEffect(() => {
    if (login) {
      getUser(login).catch((error) => {
        console.log(error);
        setNotFound(true);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return notFound ? <NotFound /> : user && <div>{user.login}</div>;
}

export default User;
