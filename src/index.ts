import express, { Express } from 'express';
import compression from 'compression';
import cors from 'cors';
import dotenv from 'dotenv';

import { errorHandler, errorLogger, logger } from './middleware';
import { router } from './router';

dotenv.config();

/**
 * Set Variables
 */

const ALLOWED_ORIGIN: string = process.env.ALLOWED_ORIGIN || 'http://localhost:3000';
const PORT: string = process.env.PORT || '4001';

const app: Express = express();

/**
 *  Configuration
 */

app.use(compression());

app.use(
  cors({
    credentials: true,
    origin: ALLOWED_ORIGIN
  })
);
app.use(express.json());

app.use(logger);

app.use('/', router);

/**
 *  Error handler
 */

app.use(errorLogger);
app.use(errorHandler);

/**
 * Server Activation
 */

app.listen(PORT, () => console.log(`service is listening on localhost: ${PORT}`));
