import Alert from '../components/layout/Alert';
import UserResults from '../components/users/UserResults';
import UserSearch from '../components/users/UserSearch';

function Home(): JSX.Element {
  return (
    <>
      <Alert />
      <UserSearch />
      <UserResults />
    </>
  );
}

export default Home;
