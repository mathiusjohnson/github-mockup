import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CommitList from './components/CommitList';
import { loadState } from '../../helpers/localStorage';
import axios from 'axios';
const ReactMarkdown = require('react-markdown');

function SinglePostPage({ repos }) {
  const [readMe, setReadMe] = useState({});

  const repo = loadState();

  const readmeURL = `https://raw.githubusercontent.com/${repo.full_name}/master/README.md`;

  useEffect(() => {
    axios
      .get(readmeURL)
      .then((res) => {
        setReadMe(res.data);
      })
      .catch((err) => console.log('error in axios call: ', err));
  });

  if (!repo) {
    return (
      <section>
        <h2>Repo not found!</h2>
        <Link to="/repos">Back</Link>
      </section>
    );
  }

  const repoName = repo.name;

  return (
    <section className="border-2 border-black  m-2 py-2 px-3 rounded-xl">
      <article className="post space-y-4">
        <h2 className="text-2xl font-extrabold text-center">{repoName}</h2>
        <h3 className="text-xl uppercase text-center">readme</h3>
        <ReactMarkdown source={readMe} />

        <CommitList repoName={repoName} />

        <div className="flex justify-center">
          <Link className="btn btn-tertiary w-1/6" to="/repos">Back</Link>
        </div>

      </article>
    </section>
  );
}

const mapStateToProps = (state) => ({
  repos: state.repos,
});

export default connect(mapStateToProps)(SinglePostPage);
