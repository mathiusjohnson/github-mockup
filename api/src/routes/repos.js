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
      // console.log("Body: ", body);
      });
  });

  request.end();

// console.log(typeof body);
// body = body.filter(repo => repo.fork === true)


// console.log(body);
repos.get('/', async (req, res) => {
  res.header('Cache-Control', 'no-store');
  let data = JSON.parse(body)
  console.log(data.length);
  data = data.filter(repo => repo.fork === true)
  console.log(data.length);
  // console.log(typeof JSON.parse(body));
  // for (const repo of body) {
  //   console.log(repo);
  //   // if (repo.fork !== false) {
  //   //   console.log("true");
  //   // }
  // }
  // console.log(yourJson);

  // TODO: See README.md Task (A). Return repo data here. You’ve got this!
  for (const repository of yourJson) {
    if (repository.fork !== false) {
      res.json(repository);
    }
  }
});
