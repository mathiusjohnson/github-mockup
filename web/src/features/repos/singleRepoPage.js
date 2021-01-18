import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectRepoById } from './repoSlice';
import axios from 'axios';
import CommitList from './components/CommitList';
import { loadState, saveState } from '../../helpers/localStorage';

export default function SinglePostPage({ match }) {
  const { repoId } = match.params;
  const persistedId = loadState()
  console.log("persisted: ", persistedId);
  let cookieId = localStorage.getItem('currentRepo')
	? localStorage.getItem('currentRepo')
  : '';

  const repo = useSelector((state) => selectRepoById(state, persistedId));

  console.log(repo);
  if (!repo) {
    return (
      <section>
        <h2>Repo not found!</h2>
      </section>
    );
  }

  const readmeURL = `https://raw.githubusercontent.com/${repo.full_name}/master/README.md`;
  const repoName = repo.name

  return (
    <section>
      <article className="post">
      <CommitList repoName={repoName} />

        <h2>{repo.title}</h2>
        <a href={readmeURL} target="_blank" rel="noopener noreferrer" >
          README
        </a>
        <br />
        <Link to="/repos">Back</Link>
      </article>
    </section>
  );
}
