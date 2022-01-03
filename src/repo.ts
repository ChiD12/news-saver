import { MongoClient, WithId, Document } from 'mongodb';

export interface UserRepo {
  run(): Promise<WithId<Document>[]>;
  insert(name: string): Promise<void>;
  getAll(): Promise<WithId<Document>[]>;
  getUser(): Promise<WithId<Document> | null>;
}

export const createRepo = (client: MongoClient): UserRepo => {
  // const client = new MongoClient(uri);
  // await client.connect();
  const run = async () => {
    const database = client.db('sample_mflix');
    const movies = database.collection('movies');
    // Query for a movie that has the title 'Back to the Future'
    const query = { rated: 'UNRATED' };
    const movie = await movies.find(query).toArray();

    console.log(movie);
    return movie;
  };

  const insert = async (name: string) => {
    const database = client.db('news');
    const user = database.collection('user');
    const options = { upsert: true };
    // create a document to insert
    const doc = {
      name
    };

    const updateDoc = {
      $set: {
        name
      }
    };
    const result = await user.updateOne(doc, updateDoc, options);
    console.log(`A document was inserted with the _id: ${result.upsertedId}`);
  };

  const getAll = async () => {
    const database = client.db('news');
    const movies = database.collection('user');
    // Query for a movie that has the title 'Back to the Future'
    const query = {};
    const users = await movies.find(query).toArray();

    console.log(users);
    return users;
  };

  const getUser = async () => {
    const database = client.db('news');
    const movies = database.collection('user');
    // Query for a movie that has the title 'Back to the Future'
    const query = {
      name:
        'fqPbK7AHQre2MgspsYolYF:APA91bGgPno3WJV29atuPYiJbcimZgFynBpXZR5Kt22Zf-CPdWNYY4w6R2ua-6-GkWpOZgr4iky1c9tWH_f9EXghzVNQvMpYScmaeuAA1qHKV_SuX7lMsbLhGE0TeBdLlMPQXlWPDjnl'
    };
    const user = await movies.findOne(query);

    console.log(user);
    return user;
  };

  return { run, insert, getAll, getUser };
};
