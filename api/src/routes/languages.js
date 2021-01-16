import { Router } from 'express';
import yourJson from '../../data/repos.json';
import https from 'https';

export const languages = Router();

const username = 'mathiusjohnson';
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

languages.get('/', async (req, res) => {
  res.header('Cache-Control', 'no-store');
  console.log(typeof body);
  let data = JSON.parse(body);
  data = data.filter((repo) => repo.fork === false);


  res.json(data);
});
