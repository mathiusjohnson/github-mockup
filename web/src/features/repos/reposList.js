/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchRepos, selectRepoIds, selectRepoById } from './reposSlice';

function RepoExcerpt({ repoId }) {
  // const [languages, setLanguages] = useState('');
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const repo = useSelector((state) => selectRepoById(state, repoId));
  // if (!languages.includes(repo.language)) {
  //   setLanguages(languages.push(repo.language));
  // }
  // console.log(languages);

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
    </article>
  );
}

// for (const language in languageObject) {
//   if (Object.hasOwnProperty.call(languageObject, language)) {
//     const element = languageObject[language];
//     console.log(element);
//   }
// }
// console.log(languageObject['CSS]);
// const languages = Object.keys(languageObject);

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

  console.log(languages);
  // const languages = entities.foreach((entity) => entity.language);
  // console.log(languages);
  const repoStatus = useSelector((state) => state.repos.status);
  const error = useSelector((state) => state.repos.error);

  useEffect(() => {
    if (repoStatus === 'idle') {
      dispatch(fetchRepos());
    }
  }, [repoStatus, dispatch]);

  let content;

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
      {/* {buttons()} */}
      {content}
    </section>
  );
}
