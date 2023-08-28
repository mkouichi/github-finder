import User from '../../models/user';
import Repo from '../../models/repo';

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

// Search users
export const searchUsers = async (text: string): Promise<User[]> => {
  const params = new URLSearchParams({ q: text });

  const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
    },
  });

  const { items }: { items: User[] } = await response.json();

  return items;
};

// Get single user
export const getUser = async (login: string): Promise<User> => {
  const response = await fetch(`${GITHUB_URL}/users/${login}`, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
    },
  });

  if (response.status === 404) {
    throw new Response(
      JSON.stringify({ status: 404, message: 'User Not Found' }),
      { status: 404 }
    );
  } else {
    const data: User = await response.json();
    return data;
  }
};

// Get user repos
export const getRepos = async (login: string): Promise<Partial<Repo>[]> => {
  const params = new URLSearchParams({ sort: 'created', per_page: '10' });

  const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
    },
  });

  if (response.status === 404) {
    throw new Response(
      JSON.stringify({ status: 404, message: 'Repos Not Found' }),
      { status: 404 }
    );
  } else {
    const data: Partial<Repo>[] = await response.json();
    return data;
  }
};
