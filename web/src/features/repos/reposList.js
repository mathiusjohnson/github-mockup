import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchRepos, selectRepoIds, selectRepoById } from './reposSlice';

function RepoExcerpt({ repoId, languageToFilter }) {
  const repo = useSelector((state) => selectRepoById(state, repoId));

  if (languageToFilter !== undefined && repo.language === languageToFilter) {
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
  } else {
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
}
export default function ReposList() {
  const dispatch = useDispatch();
  const orderedrepoIds = useSelector(selectRepoIds);

  const entities = useSelector((state) => state.repos.entities);

  const languages = [];
  for (const entity in entities) {
    if (Object.hasOwnProperty.call(entities, entity)) {
      const element = entities[entity];
      if (!languages.includes(element.language)) {
        languages.push(element.language);
      }
    }
  }

  let content;
  let buttonClicked = false;
  let languageToFilter;

  const filterLanguage = (language) => {
    buttonClicked = true;
    languageToFilter = language;
  };

  const buttons = languages.map((language, index) => {
    return (
      <button onClick={filterLanguage(language)} key={index}>
        {language}
      </button>
    );
  });

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
    if (buttonClicked === true) {
      content = orderedrepoIds.map((repoId) => (
        <RepoExcerpt key={repoId} repoId={repoId} language={languageToFilter} />
      ));
    } else {
      content = orderedrepoIds.map((repoId) => (
        <RepoExcerpt key={repoId} repoId={repoId} />
      ));
    }
  } else if (repoStatus === 'error') {
    content = <div>{error}</div>;
  }

  return (
    <section className="repos-list">
      <h2>Repos</h2>
      <ul>{buttons}</ul>
      {content}
    </section>
  );
}
