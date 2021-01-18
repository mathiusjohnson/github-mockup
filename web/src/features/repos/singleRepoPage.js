import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectRepoById } from './repoSlice';
import axios from 'axios';
import CommitList from './components/CommitList';

export default function SinglePostPage({ match }) {
  const { repoId } = match.params;

  let cookieId = localStorage.getItem('currentRepo')
	? localStorage.getItem('currentRepo')
  : '';
  // console.log(typeof cookieId);
  console.log("params: ", repoId);
  const repo = useSelector((state) => selectRepoById(state, repoId));


  const readmeURL = `https://raw.githubusercontent.com/${repo.full_name}/master/README.md`;
  const repoName = repo.name

  if (!repo) {
    return (
      <section>
        <h2>Repo not found!</h2>
      </section>
    );
  }

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
