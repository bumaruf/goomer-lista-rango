import express from 'express';
import cors from 'cors';

import { router } from './routes/index.routes';

const app = express();

app.use(cors());
app.use(express.json());

export default app;
