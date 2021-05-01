#!/usr/bin/env node
'use strict';

import { Users } from './db/models';
import { connect, disconnect } from './db/connection';
import { ROLES } from './data/constants';

export const importData = async () => {
  connect();

  // create AOEH user
  await Users.createUser({
    username: 'admin',
    password: 'admin0830',
    email: 'admin@gmail.com',
    role: ROLES.ADMIN,
    firstName: 'admin',
    lastName: 'admin',
  });

  disconnect();
};

importData();
