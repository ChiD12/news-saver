import express from 'express';
import { MongoClient } from 'mongodb';
import { createUserService } from './services';
import { createRepo } from './repo';

export const router = express.Router();

const uri = process.env.MONGO_CONNECTION;
const client = new MongoClient(uri!);
client.connect();
const service = createUserService(createRepo(client));

router.get('/', (req, res) => {
  console.log('in route');
  res.status(200).json('Hello World test 2');
});

router.get('/george', async (req, res) => {
  const movie = await service.getMovies().catch(console.dir);
  res.status(200).json(movie);
});

router.post('/users/:name', async (req, res) => {
  await service.postUserString(req.params.name);
  res.status(204).send();
});

router.get('/users', async (req, res) => {
  const allUsers = await service.getAllUsers();
  res.status(200).json(allUsers);
});

router.get('/sendpush', async (req, res) => {
  await service.sendPush();
  res.status(200).json('successful');
});
