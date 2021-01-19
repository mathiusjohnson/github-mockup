import React from 'react';
import { useSelector, connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CommitList from './components/CommitList';
import { loadState } from '../../helpers/localStorage';
import { selectRepoById } from './repoSlice';


function SinglePostPage({repos}) {
  // const repos =
  const repo = loadState()
  console.log("persisted: ", repo);

  if (!repo) {
    return (
      <section>
        <h2>Repo not found!</h2>
        <Link to="/repos">Back</Link>
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

const mapStateToProps = state => ({
  repos: state.repos
});

export default connect(mapStateToProps)(SinglePostPage);
