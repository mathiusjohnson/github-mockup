import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Repo from './RepoItem';
import { fetchRepos } from './repoSlice';
import { connect } from 'react-redux';
import LanguageList from '../languages/fetchLanguages';
import Filter from '../filters/Header';

function RepoList({ repos }) {
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
    content = repos;
  } else if (repoStatus === 'error') {
    content = <div>{error}</div>;
  }

  content = repos;
  const owner = repos[0].owner.login;
  return (
    <div>
      <h1 className="uppercase font-extrabold text-2xl text-center">{owner}'s Repos</h1>
      <div>
        <LanguageList />
      </div>
      <Filter />
      <ul className="grid grid-cols-4 gap-3 m-3">
        {content.map((repo) => (
          <Repo key={repo.id} {...repo} />
        ))}
      </ul>
    </div>
  );
}

export default connect(null)(RepoList);
