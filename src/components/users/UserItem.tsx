import { Link } from 'react-router-dom';
import User from '../../models/user';

interface UserItemProps {
  user: User;
}

function UserItem({ user: { login, avatar_url } }: UserItemProps): JSX.Element {
  return (
    <>
      <Link className='text-base-content' to={`/users/${login}`}>
        <div className='card border dark:border-none dark:bg-neutral shadow-md compact side hover:bg-purple-50 dark:hover:bg-purple-900'>
          <div className='flex-row items-center space-x-4 card-body'>
            <div>
              <div className='avatar'>
                <div className='rounded-full shadow w-14 h-14'>
                  <img src={avatar_url} alt='Profile' />
                </div>
              </div>
            </div>

            <div>
              <h2 className='card-title'>{login}</h2>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}

export default UserItem;
