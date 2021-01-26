import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Repo from './RepoItem';
import { fetchRepos, iRepos, iRepo } from './repoSlice';
import { connect } from 'react-redux';
import LanguageList from '../languages/fetchLanguages';
import Filter from '../filters/Footer';
import { RootState } from '../../reducers/index';

function RepoList({ repos }: { repos: iRepos}) {
  const dispatch = useDispatch()

  let content

  const repoStatus = useSelector((state: RootState) => state.repos.status)
  const error = useSelector((state: RootState) => state.repos.error)

  useEffect(() => {
    if (repoStatus === 'idle') {
      dispatch(fetchRepos())
    }
  }, [repoStatus, dispatch])

  if (repoStatus === 'loading') {
    content = <div className="loader">Loading...</div>
  } else if (repoStatus === 'succeeded') {
    content = repos
  } else if (repoStatus === 'error') {
    content = <div>{error}</div>
  }

  content = repos
  if (content.length === 0) {
    return null
  }
  return (
    <div>
      <LanguageList />
      <Filter />
      <ul className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-fr	 m-3">
        {content.map((repo: iRepo) => (
          <Repo key={repo.id} {...repo} />
        ))}
      </ul>
    </div>
  )
}

export default connect(null)(RepoList)
