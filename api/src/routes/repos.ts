import { Router, Request, Response } from 'express';
import yourJson from '../../data/repos.json';

export const repos = Router();

repos.get('/', async (_: Request, res: Response) => {
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
