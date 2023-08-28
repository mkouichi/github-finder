function RepoList({ repos }: { repos: any[] }) {
  return (
    <div className='rounded-lg shadow-lg card bg-base-100'>
      <div className='card-body'>
        <h2 className='text-3xl my-4 font-bold card-title'>
          Latest Respositories
        </h2>
        {repos.map((repo) => (
          <p key={repo.id}>{repo.name}</p>
        ))}
      </div>
    </div>
  );
}

export default RepoList;
