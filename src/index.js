/* eslint-disable no-console */
import path from 'path';
import dotenv from 'dotenv';
import express from 'express';
import { createServer } from 'http';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import formidable from 'formidable';
import { uploadfile } from './data/utils';
import { userMiddleware } from './auth';
import schema from './data';
import { connect } from './db/connection';

// load environment variables
dotenv.config();

const { MAIN_APP_DOMAIN } = process.env;

// connect to mongo database
connect();

const app = express();

app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser());

const corsOptions = {
  credentials: true,
  origin: [MAIN_APP_DOMAIN],
};
app.use(cors(corsOptions));

app.use(userMiddleware);

app.use(
  '/graphql',
  graphqlExpress((req, res) => ({ schema, context: { res, user: req.user } })),
);

app.use('/static', express.static(path.join(__dirname, '/static')));

app.post('/upload-file', async (req, res) => {
  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, response) => {
    if (err) {
      throw err;
    }

    const url = await uploadfile(response.file, __dirname);

    return res.end(url);
  });
});

const server = createServer(app);

const { PORT } = process.env;

server.listen(PORT, () => {
  console.log(`GraphQL Server is now running on ${PORT}`);
});

if (process.env.NODE_ENV === 'development') {
  app.use(
    '/graphiql',
    graphiqlExpress({
      endpointURL: '/graphql',
    }),
  );
}
