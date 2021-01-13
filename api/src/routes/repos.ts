import { Router, Request, Response } from 'express';
import yourJson from '../../data/repos.json';
const request = require('request');

export const repos = Router();

const url = 'https://api.github.com/users/silverorange/repos';

repos.get('/', async (_: Request, res: Response) => {
  res.header('Cache-Control', 'no-store');

  res.status(200);
  // console.log(yourJson);

  // TODO: See README.md Task (A). Return repo data here. You’ve got this!
  let data;
  request({
    url: url,
    json: true
  }, function (error: any, response: {statusCode: number;}, body: any) {
      if (!error && response.statusCode === 200) {
        console.log(body) // Print the json response
        data = body;
    }
    console.log(data);

  })

  for (const repository of yourJson) {
    if (repository.fork !== false) {
      res.json(repository);
    }
  }
});
