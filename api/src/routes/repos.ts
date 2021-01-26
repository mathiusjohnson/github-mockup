import { Router } from 'express';
import yourJson from '../../data/repos.json';
import { getAPI } from '../db/index';
import { Octokit } from '@octokit/rest'

export const repos = Router();

console.log(typeof getAPI);

console.log("this repo file works");

let repoData: any;

repos.get('/', async (req, res) => {

  const octokit = new Octokit({
    auth: "0acfb7a6a3c3b0f4891e6fb997a8e095ae97a32f",
  });

  octokit.repos
    .listForOrg({
      org: "silverorange",
      type: "public",
    })
    .then(({ data }: {data:any}) => {

      data = data.filter((repo: {fork: boolean;}) => repo.fork === false)

      for (const repository of yourJson) {
          if (repository.fork === false) {
            data.push(repository);
            repoData = data;
            res.json(data);
          }
        }
    });
});

export const languages = Router();

languages.get('/', async (req, res) => {

  let languages: any = {};
  let id = 0;
  for (const key in repoData) {
    if (Object.hasOwnProperty.call(repoData, key)) {
      const repo = repoData[key];
      if (repo.fork !== false) {
        continue;
      }
      if (repo.language === null) {
        continue;
      }
      if (!languages[repo.language]) {
        languages[repo.language] = {id, language: repo.language};
      }
    }
    id++
  }
  res.json(languages)
});
