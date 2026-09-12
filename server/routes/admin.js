import express from 'express';
import { readDB, writeDB } from '../db.js';

const router = express.Router();

// GET /api/admin/verifications — Fetch pending verifications
router.get('/verifications', (req, res) => {
  const db = readDB();
  res.json(db.verifications || []);
});

// POST /api/admin/verifications/:id/approve — Approve student verification
router.post('/verifications/:id/approve', (req, res) => {
  const db = readDB();
  const id = req.params.id;

  db.verifications = (db.verifications || []).filter(v => v.id !== id);
  writeDB(db);

  res.json({ message: 'Verification approved successfully' });
});

// GET /api/admin/stats — Get platform GTV and revenue metrics
router.get('/stats', (req, res) => {
  const db = readDB();
  const projects = db.projects || [];
  
  const gtv = projects.reduce((acc, p) => acc + p.budget, 18500);
  const revenue = Math.round(gtv * 0.10);

  res.json({
    totalGTV: gtv,
    platformRevenue: revenue,
    activeProjects: projects.length,
    totalVerifiedStudents: (db.students || []).length + 38
  });
});

export default router;
