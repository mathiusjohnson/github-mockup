import { Router } from 'express';
import yourJson from '../../data/repos.json';
import https from 'https';
const { Octokit } = require("@octokit/rest");

export const repos = Router();

const username = 'silverorange';
const options = {
  hostname: 'api.github.com',
  path: '/users/' + username + '/repos',
  method: 'GET',
  headers: { 'user-agent': 'node' },
};

let body = '';

// const request = https.request(options, function (response) {
//   response.on('data', function (chunk) {
//     body += chunk;
//   });
// });
// request.end();


// Compare: https://docs.github.com/en/rest/reference/repos/#list-organization-repositories


repos.get('/', async (req, res) => {
  res.header('Cache-Control', 'no-store');
  const octokit = new Octokit();


  octokit.repos
  .listForOrg({
    org: "silverorange",
    type: "public",
  })
  .then(({ data }) => {
    // handle data
    // console.log("data in octokit: ", data);
   body = data;
  });

  console.log(body);
  // let data = JSON.parse(body);

  // console.log(typeof data);
  // data = data.filter((repo) => repo.fork === false);

  // console.log(data);
  for (const repository of yourJson) {
    if (repository.fork === false) {
      body.push(repository);
      res.json(body);
    }
  }
});
