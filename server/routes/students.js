import express from 'express';
import { readDB, writeDB } from '../db.js';

const router = express.Router();

// GET /api/students — Search & filter students
router.get('/', (req, res) => {
  const db = readDB();
  let students = db.students || [];

  const { query, category, campus, maxPrice, minRating } = req.query;

  if (query) {
    const q = query.toLowerCase();
    students = students.filter(s => 
      s.name.toLowerCase().includes(q) ||
      s.primarySkill.toLowerCase().includes(q) ||
      s.college.toLowerCase().includes(q) ||
      s.bio.toLowerCase().includes(q)
    );
  }

  if (category && category !== 'all') {
    students = students.filter(s => s.category === category);
  }

  if (campus && campus !== 'all') {
    students = students.filter(s => s.college === campus);
  }

  if (maxPrice) {
    students = students.filter(s => s.startingPrice <= Number(maxPrice));
  }

  if (minRating) {
    students = students.filter(s => s.rating >= Number(minRating));
  }

  res.json(students);
});

// GET /api/students/:id — Get full student profile
router.get('/:id', (req, res) => {
  const db = readDB();
  const student = (db.students || []).find(s => s.id === req.params.id);

  if (!student) {
    return res.status(404).json({ error: 'Student profile not found' });
  }

  res.json(student);
});

export default router;
