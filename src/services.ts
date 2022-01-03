import { UserRepo } from './repo';

const FCM = require('fcm-node');

export const createUserService = (repo: UserRepo) => {
  const postUserString = (name: string) => {
    return repo.insert(name).catch(console.dir);
  };

  const getMovies = () => {
    return repo.run();
  };

  const getAllUsers = () => {
    return repo.getAll();
  };

  const sendPush = async () => {
    const user = await repo.getUser();
    if (user == null) return;

    console.log(user?.name);
    const serverKey = process.env.FIREBASE_KEY;
    const fcm = new FCM(serverKey);

    const message = {
      to: `${user.name}`,
      notification: {
        title: 'NotifcatioTestAPP',
        body: '{"Message from node js app"}'
      },

      data: {
        title: 'ok cdfsdsdfsd',
        body: '{"name" : "okg ooggle ogrlrl","product_id" : "123","final_price" : "0.00035"}'
      }
    };

    fcm.send(message, (err: string, response: string) => {
      if (err) {
        console.log(`Something has gone wrong: ${err}`);
        console.log(`Response: ${response}`);
      } else {
        // showToast("Successfully sent with response");
        console.log('Successfully sent with response: ', response);
      }
    });
  };

  return { postUserString, getMovies, getAllUsers, sendPush };
};
