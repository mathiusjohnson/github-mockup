import React, { useEffect, useState } from 'react'
import axios from 'axios'

interface IAuthor {
  name: string;
  email: string;
  date: number;
}

interface ICommitData {
  author: IAuthor;
  message: string;
}

export interface ICommit {
  sha: string;
  commit: ICommitData;
}

export interface IProps {
  repoName: string;
}


// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const CommitList = (props: IProps) => {
  const repoName = props.repoName;
  // your request does not return ICommits
  // it returns a ICommit[] -> Icommit array
  const [commitList, setCommitList] = useState<ICommit[]>([]);

  useEffect(() => {
    axios
      .get(`https://api.github.com/repos/octokit/${repoName}/commits`)
      .then((res) => {
        setCommitList(res.data);
      });
  }, [repoName]);


  const dateToMilis = (commitWrapper: ICommit) =>
    new Date(commitWrapper.commit.author.date).getTime();

  // console.log(commitList[commitKeys[0] as keyof ICommits]);

  const renderedCommits = commitList.map((commitWrapper, index) => {
    // this condition would cause only the first
    // commit to render is this intentional
    if (index !== 0) {
      return null;
    } else {
      const startTimeISOString = commitWrapper.commit.author.date;
      const startTimeDate = new Date(startTimeISOString).toDateString();

      return (
        <li key={index}>
          <p>Author: {commitWrapper.commit.author.name}</p>
          <p>Committed on: {startTimeDate}</p>
          <p>Commit message: {commitWrapper.commit.message}</p>
        </li>
      );
    }
  });

  return (
    <div>
      <h2>Most recent commit</h2>
      <ol>{renderedCommits}</ol>
    </div>
  );
};

export default CommitList;
