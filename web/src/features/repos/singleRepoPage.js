import React from 'react';
import { useSelector } from 'react-redux';

import { selectRepoById } from './reposSlice';

export default function SinglePostPage({ match }) {
  const { repoId } = match.params;

  const repo = useSelector((state) => selectRepoById(state, repoId));

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

        <p className="post-content">{repo.content}</p>
      </article>
    </section>
  );
}
