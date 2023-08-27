import { useContext, useState } from 'react';
import GithubContext from '../../context/github/GithubContext';
import AlertContext from '../../context/alert/AlertContext';

function UserSearch(): JSX.Element {
  const [text, setText] = useState('');

  const { users, searchUsers, clearResults } = useContext(GithubContext);
  const { setAlert } = useContext(AlertContext) ?? {
    setAlert: () => {},
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setText(e.target.value);

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();

    if (text === '') {
      setAlert('error', 'Please enter something');
    } else {
      searchUsers(text);
      setText('');
    }
  };

  return (
    <div className='grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8'>
      <div>
        <form onSubmit={handleSubmit}>
          <div className='form-control'>
            <div className='join'>
              <input
                type='text'
                className='w-full bg-gray-100 input input-lg text-black input-bordered join-item'
                placeholder='Search'
                value={text}
                onChange={handleChange}
              />
              <button
                type='submit'
                className='btn btn-primary btn-lg md:w-36 join-item'>
                Go
              </button>
            </div>
          </div>
        </form>
      </div>
      {users.length > 0 && (
        <div>
          <button className='btn btn-outline btn-lg' onClick={clearResults}>
            Clear
          </button>
        </div>
      )}
    </div>
  );
}

export default UserSearch;
