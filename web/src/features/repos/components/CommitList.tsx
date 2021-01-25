import React, { useEffect, useState } from 'react'
import axios from 'axios'

interface iProps {
  repoName: string
}

interface iCommits {
  [key: string]: iCommit,

}

interface iCommit {
  sha: string,
  commit: iCommitData
}

interface iCommitData {
  author: iAuthor
  message: string
}

interface iAuthor {
  name: string,
  email: string,
  date: number
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const CommitList = (props: iProps) => {
  const repoName = props.repoName
  const [commitList, setCommitList] = useState<iCommits | []>([])

  useEffect(() => {
    axios
      .get(`https://api.github.com/repos/silverorange/${repoName}/commits`)
      .then(res => {
        setCommitList(res.data)
      })
  }, [repoName])

  console.log(commitList);

  let sortedCommits: iCommits;
  let commitKeys: string[] | "" = [];
console.log("commitList: ", typeof commitList);

  if (commitList && commitList.length > 0) {


    commitKeys =
    commitList !== undefined ? Object.keys(commitList) : ''
  }


  const renderedCommits = commitKeys
    ? commitKeys.map((commit: string, index: number) => {
        if (index !== 0) {
          const startTimeISOString = sortedCommits[commit].commit.author.date
          const startTimeDate = new Date(startTimeISOString).toDateString()
          console.log("not the latest commit: ", startTimeDate);
          return null
        } else {
          const startTimeISOString = sortedCommits[commit].commit.author.date
          const startTimeDate = new Date(startTimeISOString).toDateString()
          console.log("latest commit: ", startTimeDate);


          return (
            <li key={index}>
              <p>Author: {sortedCommits[commit].commit.author.name}</p>
              <p>Committed on: {startTimeDate}</p>
              <p>Commit message: {sortedCommits[commit].commit.message}</p>
            </li>
          )
        }
      })
    : ''

  return (
    <div>
      <h2>Most recent commit</h2>
      <ol>{renderedCommits}</ol>
    </div>
  )
}

export default CommitList
