import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Repo from './Repo'
import { fetchRepos } from './repoSlice';

export default function RepoList ({repos}) {
  const dispatch = useDispatch();

  let content;

  const repoStatus = useSelector((state) => state.repos.status);
  const error = useSelector((state) => state.repos.error);

  useEffect(() => {
    if (repoStatus === 'idle') {
      dispatch(fetchRepos());
    }
  }, [repoStatus, dispatch]);

  if (repoStatus === 'loading') {
    content = <div className="loader">Loading...</div>;
  } else if (repoStatus === 'succeeded') {
    content = repos
  } else if (repoStatus === 'error') {
    content = <div>{error}</div>;
  }

  return (
    <ul>
      {repos.map(repo => (
        <Repo key={repo.id} {...repo} />
      ))}
    </ul>
  )
}
