// import { Octokit } from "@octokit/core";
// import React, { useState, useEffect } from 'react';

// export default function CommitListComponent() {
//   const [commits, setCommits] = useState([]);


//   useEffect(() => {
//     const octokit = new Octokit({ auth: '0acfb7a6a3c3b0f4891e6fb997a8e095ae97a32f' });
//     const owner = 'mathiusjohnson',
//                  repo = 'Kuhner',
//            perPage = 5;

//     const fiveMostRecentCommits = octokit.request(
//         `GET /repos/{owner}/{repo}/commits`, { owner, repo, per_page: perPage }
//     );

//     setCommits(fiveMostRecentCommits);
//   }, [])
//     // console.log("commits: ", commits);
//     return (
//       <ul>
//         {/* {commits.map(commit => (
//           <li key={commit.id}>
//             {commit.author.name}: {commit.message}
//           </li> */}
//         {/* ))} */}
//       </ul>
//     );
// }
