import config from 'config';
import context from './middleware/context';
import express from 'express';
import gracefulShutdown from '@nc/utils/graceful-shutdown';
import helmet from 'helmet';
import Logger from '@nc/utils/logging';
import security from './middleware/security';
import { router as userRoutes } from '@nc/domain-user';
import { router as expenseRoutes } from '@nc/domain-expense';
import { createServer as createHTTPServer, Server } from 'http';
import { createServer as createHTTPSServer, Server as SecureServer } from 'https';
import { sequelize } from '@nc/utils/db'

const logger = Logger('server');
const app = express();
const server: Server | SecureServer | any = (config.https.enabled === true) ? createHTTPSServer(config.https, app as any) : createHTTPServer(app as any);
server.ready = false;

gracefulShutdown(server);

app.use(helmet());
app.get('/readycheck', function readinessEndpoint(req, res) {
  const status = (server.ready) ? 200 : 503;
  res.status(status).send(status === 200 ? 'OK' : 'NOT OK');
});

app.get('/healthcheck', function healthcheckEndpoint(req, res) {
  res.status(200).send('OK');
});

app.use(context);
app.use(security);

app.use('/user', userRoutes);
app.use('/expense', expenseRoutes);

app.use(function(err, req, res,next) {
  res.status(err.status ?? 500).json(err);
});

server.listen(config.port, () => {
  server.ready = true;
  sequelize.authenticate();
  sequelize.sync();
  logger.log(`Server started on port ${config.port}`);
});

export default server;
