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

// POST /api/students/services — Publish a new skill service listing
router.post('/services', (req, res) => {
  const { studentId, title, description, category, price, deliveryDays, revisions, portfolioImg } = req.body;

  if (!title || !price || !category) {
    return res.status(400).json({ error: 'Title, price, and category are required' });
  }

  const db = readDB();
  const targetId = studentId || 'student-aarav';
  const student = (db.students || []).find(s => s.id === targetId);

  if (!student) {
    return res.status(404).json({ error: 'Student profile not found' });
  }

  const newService = {
    id: `srv-${Date.now().toString().slice(-4)}`,
    title,
    description: description || 'High quality student work delivered on time.',
    price: Number(price),
    deliveryDays: Number(deliveryDays) || 2,
    revisions: Number(revisions) || 3,
    rating: 5.0,
    salesCount: 0
  };

  student.services.unshift(newService);

  if (portfolioImg) {
    student.portfolio.unshift({
      id: `p-${Date.now().toString().slice(-4)}`,
      title,
      image: portfolioImg,
      category,
      description
    });
  }

  writeDB(db);
  res.status(201).json({ service: newService, student });
});

// DELETE /api/students/services/:id — Admin deletion of skill service
router.delete('/services/:id', (req, res) => {
  const db = readDB();
  const serviceId = req.params.id;

  let found = false;
  (db.students || []).forEach(student => {
    const idx = student.services.findIndex(srv => srv.id === serviceId);
    if (idx !== -1) {
      student.services.splice(idx, 1);
      found = true;
    }
  });

  if (!found) {
    return res.status(404).json({ error: 'Service not found' });
  }

  writeDB(db);
  res.json({ message: 'Service deleted successfully' });
});

// PATCH /api/students/services/:id — Admin modification of skill service
router.patch('/services/:id', (req, res) => {
  const db = readDB();
  const serviceId = req.params.id;
  const { title, price, description } = req.body;

  let targetService = null;
  (db.students || []).forEach(student => {
    const srv = student.services.find(s => s.id === serviceId);
    if (srv) {
      if (title) srv.title = title;
      if (price) srv.price = Number(price);
      if (description) srv.description = description;
      targetService = srv;
    }
  });

  if (!targetService) {
    return res.status(404).json({ error: 'Service not found' });
  }

  writeDB(db);
  res.json(targetService);
});

export default router;
