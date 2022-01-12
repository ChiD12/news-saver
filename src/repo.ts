/* eslint-disable no-underscore-dangle */
import { MongoClient, WithId, Document } from 'mongodb';
import { Device, User, UserInput, UserRepo } from './interfaces/interfaces';

export const createRepo = (client: MongoClient): UserRepo => {
  const insertUser = async (user: UserInput) => {
    const database = client.db('news');
    const usersCollection = database.collection('user');
    const options = { upsert: true };
    const filter = {
      name: user.name
    };

    const doc = {
      $setOnInsert: {
        name: user.name,
        password: user.password,
        email: user.email,
        devices: []
      }
    };

    const result = await usersCollection.updateOne(filter, doc, options);
    console.log(`A document was inserted with the _id: ${result.upsertedId}`);
    if (result.upsertedId === null) return false;
    return true;
  };

  const insertDevice = async (device: Device, userName: string) => {
    const database = client.db('news');
    const usersCollection = database.collection('user');
    const filter = {
      name: userName
    };

    const doc = {
      $addToSet: {
        devices: {
          deviceType: device.deviceType,
          externalDeviceId: device.externalDeviceId,
          userId: device.userId
        }
      }
    };

    const result = await usersCollection.updateOne(filter, doc);
    console.log(`A document was inserted with the _id: ${result.upsertedId}`);
    if (result.upsertedId === null) return false;
    return true;
  };

  const getAll = async () => {
    const database = client.db('news');
    const usersCollection = database.collection('user');
    const query = {};
    const documents = await usersCollection.find(query).toArray();
    const users: User[] = documents.map((doc: WithId<Document>) => {
      return { id: doc.id, name: doc.name, password: doc.password, email: doc.email, devices: doc.devices };
    });
    console.log(users);
    return users;
  };

  const getUserByName = async (name: string) => {
    const database = client.db('news');
    const usersCollection = database.collection('user');
    const query = {
      name
    };
    const document = await usersCollection.findOne(query);
    if (document === null) return null;
    const user: User = {
      id: document._id.toString(),
      name: document.name,
      email: document.email,
      password: document.password,
      devices: document.devices
    };
    console.log(user);
    return user;
  };

  return { insertUser, insertDevice, getAll, getUserByName };
};
