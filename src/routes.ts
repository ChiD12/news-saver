import express from 'express';
import { MongoClient } from 'mongodb';
import { celebrate, Segments } from 'celebrate';

import { UserSchema, LoginSchema } from './schema/schema';
import { createUserService } from './services';
import { createRepo } from './repo';
import { UserInput, LoginInput } from './interfaces/interfaces';

export const router = express.Router();

const uri = process.env.MONGO_CONNECTION;
const client = new MongoClient(uri!);
client.connect();
const service = createUserService(createRepo(client));

router.post('/users', celebrate({ [Segments.BODY]: UserSchema }), async (req, res) => {
  const user = req.body as UserInput;
  const uniqueName = await service.postUser(user);
  if (!uniqueName) {
    res.status(403).send('User already exists');
  } else {
    res.status(204).send();
  }
});

router.get('/users', async (req, res) => {
  const allUsers = await service.getAllUsers();
  res.status(200).json(allUsers);
});

router.post('/login', celebrate({ [Segments.BODY]: LoginSchema }), async (req, res) => {
  const login = req.body as LoginInput;
  const result = await service.login(login);
  if (result === null) {
    res.status(404).json('Username not found');
  } else if (result === 'BADPASS') {
    res.status(403).json('Password or username is incorrect');
  } else if (result) {
    res.status(200).json(result);
  }
});

router.get('/users', async (req, res) => {
  const allUsers = await service.getAllUsers();
  res.status(200).json(allUsers);
});

router.post('/checktokenexpiry', async (req, res) => {
  const { token } = req.body;
  const response = service.checkTokenExpiry(token);
  res.status(200).json(response);
});
