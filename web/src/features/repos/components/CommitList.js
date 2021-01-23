import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CommitList = (props) => {
  const repoName = props.repoName;
  const [commitList, setCommitList] = useState({});

  useEffect(() => {
    axios
      .get(`https://api.github.com/repos/silverorange/${repoName}/commits`)
      .then((res) => {
        setCommitList(res.data);
      });
  }, [repoName]);

  let sortedCommits;
  if (commitList.length > 0) {
    sortedCommits = commitList.sort(
      (a, b) => b.commit.author.date - a.commit.author.date
    );
  }

  const commitKeys =
    sortedCommits !== undefined ? Object.keys(sortedCommits) : '';
  const renderedCommits = commitKeys
    ? commitKeys.map((commit, index) => {
        if (index !== 0) {
          return null;
        } else {
          const startTimeISOString = sortedCommits[commit].commit.author.date;
          const startTimeDate = new Date(startTimeISOString).toDateString();

          return (
            <li className="bg-gray-200 rounded p-4 space-y-2" key={index}>
              <p className="text-xl">Last updated by {sortedCommits[commit].commit.author.name} on {startTimeDate}</p>
              <p>Commit message: {sortedCommits[commit].commit.message}</p>
            </li>
          );
        }
      })
    : '';

  return (
    <div>
      <ol>{renderedCommits}</ol>
    </div>
  );
};

export default CommitList;
