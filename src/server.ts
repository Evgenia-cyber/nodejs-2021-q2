import 'reflect-metadata';
import { createConnection } from 'typeorm';
import app from './app';
import { PORT } from './common/config';
import { logError } from './middlewares';
import { dbConfig } from './common/dbconfig';

createConnection(dbConfig)
  .then( async connection => {
   if(connection.isConnected) {
     // eslint-disable-next-line no-console
    console.log('Database is connected');
    app.listen(PORT, () =>
      // eslint-disable-next-line no-console
      console.log(`App is running on http://localhost:${PORT}`)
    );
  } else {
      connection.connect();
    }
  })
  .catch((err) => {
    logError(`Unable to connect to db: Error: ${err}`);
  });
