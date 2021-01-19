import { Router } from 'express';
import yourJson from '../../data/repos.json';

const { Octokit } = require("@octokit/rest");

export const repos = Router();
console.log("this repo file works");
repos.get('/', async (req, res) => {
  res.header('Cache-Control', 'no-store');

  const octokit = new Octokit({
    auth: "0acfb7a6a3c3b0f4891e6fb997a8e095ae97a32f",
  });

  octokit.repos
    .listForOrg({
      org: "silverorange",
      type: "public",
    })
    .then(({ data }) => {
      data = data.filter((repo: {fork: boolean;}) => repo.fork === false)
      for (const repository of yourJson) {
          if (repository.fork === false) {
            data.push(repository);
            res.json(data);
          }
        }
    });
});
