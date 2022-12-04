import '../env';
import express from 'express';
import { setupDb } from './db/db-setup';
import { router } from './routes';
import { PORT, URI } from './utils';

setupDb();

const app = express();
app.use(express.json());
app.use(router);
app.listen(PORT, () => console.log(`Server is running at ${URI}`));
