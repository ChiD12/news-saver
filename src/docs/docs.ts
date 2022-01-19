import { basicinfo } from './basicinfo';
import { components } from './components';
import { users } from './users';
import { logins } from './login';
import { checktokenexpiry } from './checktokenexpiry';

export const docs = {
  ...basicinfo,
  ...components,
  paths: {
    ...users,
    ...logins,
    ...checktokenexpiry
  }
};
