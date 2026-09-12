import express from 'express';
import { readDB, writeDB } from '../db.js';

const router = express.Router();

// GET /api/gigs — Fetch all published skill gigs
router.get('/', (req, res) => {
  const db = readDB();
  let gigs = db.gigs || [];

  const { query, category, maxPrice } = req.query;

  if (query) {
    const q = query.toLowerCase();
    gigs = gigs.filter(g => 
      g.title.toLowerCase().includes(q) ||
      g.studentName.toLowerCase().includes(q) ||
      g.college.toLowerCase().includes(q) ||
      g.description.toLowerCase().includes(q)
    );
  }

  if (category && category !== 'all') {
    gigs = gigs.filter(g => g.category === category);
  }

  if (maxPrice) {
    gigs = gigs.filter(g => g.price <= Number(maxPrice));
  }

  res.json(gigs);
});

// GET /api/gigs/:id — Get single gig
router.get('/:id', (req, res) => {
  const db = readDB();
  const gig = (db.gigs || []).find(g => g.id === req.params.id);
  if (!gig) return res.status(404).json({ error: 'Gig not found' });
  res.json(gig);
});

// POST /api/gigs — Create a new published skill gig
router.post('/', (req, res) => {
  const { title, studentName, college, category, price, deliveryDays, revisions, description, image } = req.body;

  if (!title || !price) {
    return res.status(400).json({ error: 'Title and price are required' });
  }

  const newGig = {
    id: `gig-${Date.now().toString().slice(-4)}`,
    title,
    studentId: 'student-aarav',
    studentName: studentName || 'Aarav Sharma',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    college: college || 'GLA University',
    verified: true,
    category: category || 'graphic-design',
    price: Number(price),
    deliveryDays: Number(deliveryDays) || 2,
    revisions: Number(revisions) || 3,
    rating: 5.0,
    salesCount: 0,
    description: description || 'High quality deliverable on time.',
    image: image || 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80'
  };

  const db = readDB();
  db.gigs = [newGig, ...(db.gigs || [])];
  writeDB(db);

  res.status(201).json(newGig);
});

// DELETE /api/gigs/:id — Admin deletion of a skill gig
router.delete('/:id', (req, res) => {
  const db = readDB();
  const gigId = req.params.id;

  const initialLen = (db.gigs || []).length;
  db.gigs = (db.gigs || []).filter(g => g.id !== gigId);

  if (db.gigs.length === initialLen) {
    return res.status(404).json({ error: 'Gig not found' });
  }

  writeDB(db);
  res.json({ message: 'Gig deleted successfully', id: gigId });
});

// PATCH /api/gigs/:id — Admin modification of a skill gig
router.patch('/:id', (req, res) => {
  const db = readDB();
  const gigId = req.params.id;
  const { title, price, description } = req.body;

  const gig = (db.gigs || []).find(g => g.id === gigId);
  if (!gig) {
    return res.status(404).json({ error: 'Gig not found' });
  }

  if (title) gig.title = title;
  if (price) gig.price = Number(price);
  if (description) gig.description = description;

  writeDB(db);
  res.json(gig);
});

export default router;
