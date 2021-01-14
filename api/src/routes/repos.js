import { Router } from 'express';
import yourJson from '../../data/repos.json';
import https from 'https';

export const repos = Router();

const username = 'silverorange';
const options = {
  hostname: 'api.github.com',
  path: '/users/' + username + '/repos',
  method: 'GET',
  headers: { 'user-agent': 'node' },
};

let body = '';

const request = https.request(options, function (response) {
  response.on('data', function (chunk) {
    body += chunk;
  });
});
request.end();

repos.get('/', async (req, res) => {
  res.header('Cache-Control', 'no-store');
  let data = JSON.parse(body);
  data = data.filter((repo) => repo.fork === false);

  for (const repository of yourJson) {
    if (repository.fork === false) {
      data.push(repository);
      res.json(data);
    }
  }
});
