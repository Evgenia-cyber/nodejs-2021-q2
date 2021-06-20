import 'reflect-metadata';
import { createConnection } from 'typeorm';
import app from './app';
import { PORT } from './common/config';
import { logError } from './middlewares';
import { dbConfig } from './common/database';

createConnection(dbConfig)
  .then((_connection) => {
    // eslint-disable-next-line no-console
    console.log('PORT', PORT, _connection);
    app.listen(PORT, () =>
      // eslint-disable-next-line no-console
      console.log(`App is running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    logError(`Unable to connect to db: Error: ${err}`);
  });
