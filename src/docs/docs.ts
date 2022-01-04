import { basicinfo } from './basicinfo';
import { components } from './components';
import { users, usersParam } from './users';

export const docs = {
  ...basicinfo,
  ...components,
  paths: {
    ...users,
    ...usersParam
  }
};
