import express from 'express';
import cors from 'cors';
import { initDB } from './db.js';

import studentRoutes from './routes/students.js';
import gigRoutes from './routes/gigs.js';
import projectRoutes from './routes/projects.js';
import reviewRoutes from './routes/reviews.js';
import adminRoutes from './routes/admin.js';
import uploadRoutes from './routes/upload.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Database
initDB();

// Middleware (Increase payload limit for Base64 image uploads)
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Routes
app.use('/api/gigs', gigRoutes);
app.use('/api/students/gigs', gigRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/upload', uploadRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'CAMPORA Backend REST API operational', timestamp: new Date() });
});

app.listen(PORT, () => {
  console.log(`🚀 CAMPORA Express Backend API running at http://localhost:${PORT}`);
});
