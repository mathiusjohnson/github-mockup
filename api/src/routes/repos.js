import { Router, Request, Response } from 'express';
import yourJson from '../../data/repos.json';
import https from 'https';
export const repos = Router();

const url = 'https://api.github.com/users/silverorange/repos';

const username = 'silverorange';
const options = {
  hostname: 'https://api.github.com/',
  path: 'users/' + username + '/repos',
  method: 'GET',
  headers: {'user-agent': 'node.js'}

};

const request = https.request(options, function(response){
  let body = "";

  res.on("data", (chunk) => {
      body += chunk;
  });

  res.on("end", () => {
      try {
        console.log();
          // do something with JSON
      } catch (error) {
          console.error(error.message);
      };
  });

}).on("error", (error) => {
  console.error(error.message);
});

repos.get('/', async (res) => {
  res.header('Cache-Control', 'no-store');

  res.status(200);
  // console.log(yourJson);

  // TODO: See README.md Task (A). Return repo data here. You’ve got this!
  for (const repository of yourJson) {
    if (repository.fork !== false) {
      res.json(repository);
    }
  }
});
