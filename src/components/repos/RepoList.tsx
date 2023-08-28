import Repo from '../../models/repo';
import RepoItem from './RepoItem';

function RepoList({ repos }: { repos: Partial<Repo>[] }): JSX.Element {
  return (
    <div className='rounded-lg shadow-lg card bg-base-100'>
      <div className='card-body'>
        <h2 className='text-3xl my-4 font-bold card-title'>
          Latest Respositories
        </h2>
        {repos.map((repo) => (
          <RepoItem key={repo.id} repo={repo} />
        ))}
      </div>
    </div>
  );
}

export default RepoList;
