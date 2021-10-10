import * as express from 'express';
import * as dotenv from 'dotenv';

dotenv.config();

const { PORT } = process.env;

const app = express();

app.get('/', (req, res) => {
  res.send('hello from express');
});

app.listen(PORT, () => {
  console.log(`Express listening on ${PORT}`);
});
