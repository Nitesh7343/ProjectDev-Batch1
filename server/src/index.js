import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createLocationStore } from './store.js';
import { createLocationRoutes } from './routes/locations.js';
import { errorHandler } from './middleware.js';

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 5000);
const store = await createLocationStore(process.env.MONGO_URI);

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ ok: true, service: 'park-and-ride-api' });
});

app.use('/api/locations', createLocationRoutes(store));

if (process.env.NODE_ENV === 'production') {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  app.use(express.static(join(__dirname, '../../client/dist')));
  app.get('*', (req, res) => {
    res.sendFile(join(__dirname, '../../client/dist/index.html'));
  });
}

app.use(errorHandler);

app.listen(port, () => {
  const mode = process.env.MONGO_URI ? 'MongoDB' : 'memory';
  console.log(`Park and Ride API running on port ${port} using ${mode} store`);
});
