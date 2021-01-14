import { Router, Request, Response } from 'express';
import yourJson from '../../data/repos.json';
import https from 'https';

export const repos = Router();

const url = 'https://api.github.com/users/silverorange/repos';

const username = 'silverorange';
const options = {
  hostname: 'api.github.com',
  path: '/users/' + username + '/repos',
  method: 'GET',
  headers: {'user-agent': 'node.js'}

};

let body = "";

const request = https.request(options, function(response){
  response.on("data", function(chunk){
      body += chunk;
  });

  response.on("end", function(){
      console.log("Body: ", body);
      });
  });

  request.end();

console.log(typeof body);
// body = body.filter(repo => repo.fork === true)

// console.log(body);
repos.get('/', async (req, res) => {
  res.header('Cache-Control', 'no-store');

  // console.log(yourJson);

  // TODO: See README.md Task (A). Return repo data here. You’ve got this!
  for (const repository of yourJson) {
    if (repository.fork !== false) {
      res.json(repository);
    }
  }
});
