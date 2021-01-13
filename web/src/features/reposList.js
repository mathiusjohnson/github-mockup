import { useSelector } from 'react-redux';

export default function ReposList() {
  const repos = useSelector((state) => state.repos);

  const renderedPosts = repos.map((repo) => (
    <article className="post-excerpt" key={repo.id}>
      <h3>{repo.title}</h3>
      <p className="repo-content">{repo.content.substring(0, 100)}</p>
    </article>
  ));

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  );
}
