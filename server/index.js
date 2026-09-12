import express from 'express';
import cors from 'cors';
import { initDB } from './db.js';

import studentRoutes from './routes/students.js';
import projectRoutes from './routes/projects.js';
import reviewRoutes from './routes/reviews.js';
import adminRoutes from './routes/admin.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Database
initDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/students', studentRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/admin', adminRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'CAMPORA Backend REST API operational', timestamp: new Date() });
});

app.listen(PORT, () => {
  console.log(`🚀 CAMPORA Express Backend API running at http://localhost:${PORT}`);
});
