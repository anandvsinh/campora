import express from 'express';
import { readDB, writeDB } from '../db.js';

const router = express.Router();

// GET /api/reviews — Get all verified reviews
router.get('/', (req, res) => {
  const db = readDB();
  res.json(db.reviews || []);
});

// POST /api/reviews — Post a verified review for a completed project
router.post('/', (req, res) => {
  const { projectId, rating, comment } = req.body;
  const db = readDB();

  const project = (db.projects || []).find(p => p.id === projectId);
  if (!project) {
    return res.status(404).json({ error: 'Project not found' });
  }

  const newReview = {
    id: `rev-${Date.now()}`,
    studentId: project.studentId,
    buyerName: project.buyerName,
    avatar: project.buyerAvatar,
    rating: Number(rating) || 5,
    date: 'Today',
    projectTitle: project.title,
    comment
  };

  db.reviews = [newReview, ...(db.reviews || [])];

  // Update project status to Completed
  project.status = 'Completed';
  project.stageIndex = 5;

  // Update student stats
  const student = (db.students || []).find(s => s.id === project.studentId);
  if (student) {
    student.completedProjects += 1;
    student.reviewsCount += 1;
    student.workHistory.unshift({
      projectTitle: project.title,
      clientName: project.buyerName,
      completedDate: 'Today',
      amount: project.budget,
      rating: Number(rating)
    });
  }

  writeDB(db);
  res.status(201).json(newReview);
});

export default router;
