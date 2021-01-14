import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectRepoById } from './reposSlice';

export default function SinglePostPage({ match }) {
  const { repoId } = match.params;

  const repo = useSelector((state) => selectRepoById(state, repoId));

  const readmeURL = `https://raw.githubusercontent.com/${repo.full_name}/master/README.md`;
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
        <h2>{repo.title}</h2>
        <p>Updated at: {repo.updated_at}</p>
        <a href={readmeURL} target="_blank" rel="noreferrer">
          README
        </a>
        <br />
        <Link to="/repos">Back</Link>
      </article>
    </section>
  );
}
