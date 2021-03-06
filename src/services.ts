import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { Device, LoginDto, LoginInput, UserInput, UserRepo, UserService } from './interfaces/interfaces';
import { sendDevice } from './messageQSender';

export const createUserService = (repo: UserRepo): UserService => {
  const postUser = async (user: UserInput) => {
    const hashedUser = user;
    const hashedPassword = await bcrypt.hash(user.password, 10);
    hashedUser.password = hashedPassword;
    return repo.insertUser(hashedUser).catch(console.dir);
  };

  const getAllUsers = () => {
    return repo.getAll();
  };

  const login = async (loginInput: LoginInput) => {
    const user = await repo.getUserByName(loginInput.name);
    if (user === null) return null;
    const correctPassword = await bcrypt.compare(loginInput.password, user.password);

    if (!correctPassword) return 'BADPASS';

    const device: Device = {
      deviceType: loginInput.deviceType,
      externalDeviceId: loginInput.deviceId,
      userId: user.id
    };
    if (await repo.insertDevice(device, user.name)) {
      sendDevice(device, false);
    }

    const tokenData: LoginDto = {
      name: user.name,
      userId: user.id,
      deviceType: loginInput.deviceType,
      externalDeviceId: loginInput.deviceId
    };
    return jwt.sign(tokenData, process.env.JWT_KEY!, { expiresIn: '30d' });
  };

  const checkTokenExpiry = (token: string) => {
    try {
      jwt.verify(token, process.env.JWT_KEY!);
      // return Date.now() >= decoded.iat * 1000
    } catch (err) {
      if (err instanceof jwt.TokenExpiredError) return 'Token Expired';
      return 'Invalid Token';
    }
    return 'Valid Token';
  };

  return { postUser, getAllUsers, login, checkTokenExpiry };
};
