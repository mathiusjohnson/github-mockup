import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import moment from "moment";

const CommitList = (props) => {
  const repoName = props.repoName
  const [commitList, setCommitList] = useState({});

  useEffect(() => {
    axios.get(`https://api.github.com/repos/silverorange/${repoName}/commits`)
      .then(res => {
        setCommitList(res.data);
      })
  }, [repoName])
  console.log("in component: ", commitList);

  let sortedCommits
  if (commitList.length > 0) {
    sortedCommits = commitList.sort((a, b) => b.commit.author.date - a.commit.author.date)
  }

  console.log("sorted: ", sortedCommits);

  const commitKeys = sortedCommits !== undefined ? Object.keys(sortedCommits) : "";
  console.log(commitKeys[0]);
  const renderedCommits = commitKeys ? commitKeys.map((commit, index) => {

    if (index !== 0) {
      return null;
    } else {
    const startTimeISOString = sortedCommits[commit].commit.author.date
    const startTimeDate = new Date(startTimeISOString).toDateString()
    console.log(startTimeDate);
    return (
      <li key={index}>
        <p>Author: {sortedCommits[commit].commit.author.name}</p>
        <p>Committed on: {startTimeDate}</p>
        <p>Commit message: {sortedCommits[commit].commit.message}</p>
      </li>
    )
  }}) : "";

  return (
    <div>
      <h2>
        Most recent commit
      </h2>
      <ol>
        {renderedCommits}
      </ol>
    </div>
  );
};

export default CommitList;
