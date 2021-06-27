import 'reflect-metadata';
import { createConnection } from 'typeorm';
import bcrypt from 'bcryptjs';
import { usersService } from './resources/users/user.service';
import app from './app';
import dbConfig from './common/dbconfig';
import { PORT } from './common/config';
import { logError } from './middlewares';

createConnection(dbConfig)
  .then(async (connection) => {
    if (connection.isConnected) {
      // eslint-disable-next-line no-console
      console.log('Database is connected');
      app.listen(PORT, () =>
        // eslint-disable-next-line no-console
        console.log(`App is running on http://localhost:${PORT}`)
      );
      const admin = await usersService.create({
        name: 'admin',
        login: 'admin',
        password: bcrypt.hashSync('admin', 10),
      });
      console.log(admin);
    } else {
      connection.connect();
    }
  })
  .catch((err) => {
    logError(`Unable to connect to db: Error: ${err}`);
  });
