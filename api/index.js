import express from 'express';
import cors from 'cors';
import { initDB } from '../server/db.js';

import studentRoutes from '../server/routes/students.js';
import gigRoutes from '../server/routes/gigs.js';
import projectRoutes from '../server/routes/projects.js';
import reviewRoutes from '../server/routes/reviews.js';
import adminRoutes from '../server/routes/admin.js';

const app = express();

initDB();

app.use(cors());
app.use(express.json());

app.use('/api/gigs', gigRoutes);
app.use('/api/students/gigs', gigRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/admin', adminRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'CAMPORA Vercel Express API Operational', timestamp: new Date() });
});

export default app;
