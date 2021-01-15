import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchRepos, selectRepoIds, selectRepoById } from './reposSlice';

function RepoExcerpt({ repoId }) {
  const repo = useSelector((state) => selectRepoById(state, repoId));

  return (
    <article key={repo.id}>
      <h3>Name: {repo.name}</h3>
      {repo.description !== null ? (
        <p className="repo-content">
          Description: {repo.description.substring(0, 100)}
        </p>
      ) : (
        <p>no description</p>
      )}
      {repo.language !== undefined ? (
        <p>Language:{repo.language}</p>
      ) : (
        <p>No languages</p>
      )}
      <p>Forks: {repo.forks_count}</p>
      <p>{repo.created_at}</p>
      <Link to={`/repos/${repo.id}`} className="button muted-button">
        View Repo
      </Link>
    </article>
  );
}

export default function ReposList() {
  const dispatch = useDispatch();
  const orderedrepoIds = useSelector(selectRepoIds);

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
    content = orderedrepoIds.map((repoId) => (
      <RepoExcerpt key={repoId} repoId={repoId} />
    ));
  } else if (repoStatus === 'error') {
    content = <div>{error}</div>;
  }

  return (
    <section className="repos-list">
      <h2>Repos</h2>
      {content}
    </section>
  );
}
