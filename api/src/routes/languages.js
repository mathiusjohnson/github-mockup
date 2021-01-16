import { Router } from 'express';
const { Octokit } = require("@octokit/rest");

export const languages = Router();

languages.get('/', async (req, res) => {
  res.header('Cache-Control', 'no-store');

  const { Octokit } = require("@octokit/rest");

  const octokit = new Octokit({
    auth: "0acfb7a6a3c3b0f4891e6fb997a8e095ae97a32f",
  });

  octokit.repos
  .listForOrg({
    org: "octokit",
    type: "public",
  })
  .then(({ data }) => {

    let languages = {};
    let id = 0;
    for (const key in data) {
      // console.log("key: ", key);
      if (Object.hasOwnProperty.call(data, key)) {
        const repo = data[key];
        console.log(repo.language);
        if (!languages[repo.language]) {
         languages[repo.language] = repo.language;
        }
      }
    }
    res.json(languages)
  });
});
