import express from 'express';
import { readDB, writeDB } from '../db.js';

const router = express.Router();

// GET /api/projects — Fetch projects
router.get('/', (req, res) => {
  const db = readDB();
  res.json(db.projects || []);
});

// POST /api/projects/hiring-request — Create hiring request
router.post('/hiring-request', (req, res) => {
  const { studentId, studentName, serviceId, title, description, budget, deadline, attachmentName } = req.body;

  if (!title || !budget) {
    return res.status(400).json({ error: 'Title and budget are required' });
  }

  const fee = Math.round(budget * 0.1);
  const netEarnings = budget - fee;

  const newProject = {
    id: `proj-${Date.now().toString().slice(-4)}`,
    title,
    buyerName: 'Apex Tech Society',
    buyerAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80',
    studentId: studentId || 'student-aarav',
    studentName: studentName || 'Aarav Sharma',
    serviceId: serviceId || 'srv-custom',
    budget: Number(budget),
    platformFee: fee,
    studentNetEarnings: netEarnings,
    deadline: deadline || '2026-09-25',
    status: 'Requested',
    stageIndex: 1,
    description,
    requirements: 'Standard quality requirements',
    files: attachmentName ? [{ name: attachmentName, size: '1.8 MB', date: 'Just now' }] : [],
    messages: [
      {
        id: `m-${Date.now()}`,
        sender: 'system',
        text: `Hiring request sent · Budget: ₹${budget} · Deadline: ${deadline}`,
        timestamp: 'Just now'
      },
      {
        id: `m-${Date.now() + 1}`,
        sender: 'buyer',
        senderName: 'Apex Tech Society',
        text: description,
        timestamp: 'Just now'
      }
    ]
  };

  const db = readDB();
  db.projects = [newProject, ...(db.projects || [])];
  writeDB(db);

  res.status(201).json(newProject);
});

// PATCH /api/projects/:id/status — Update project status
router.patch('/:id/status', (req, res) => {
  const { status, stageIndex } = req.body;
  const db = readDB();

  const project = (db.projects || []).find(p => p.id === req.params.id);
  if (!project) {
    return res.status(404).json({ error: 'Project not found' });
  }

  project.status = status;
  if (stageIndex) project.stageIndex = stageIndex;

  writeDB(db);
  res.json(project);
});

// POST /api/projects/:id/chat — Send workspace chat message
router.post('/:id/chat', (req, res) => {
  const { sender, senderName, text } = req.body;
  const db = readDB();

  const project = (db.projects || []).find(p => p.id === req.params.id);
  if (!project) {
    return res.status(404).json({ error: 'Project not found' });
  }

  const newMessage = {
    id: `m-${Date.now()}`,
    sender: sender || 'buyer',
    senderName: senderName || 'User',
    text,
    timestamp: 'Just now'
  };

  project.messages.push(newMessage);
  writeDB(db);

  res.status(201).json(newMessage);
});

// POST /api/projects/:id/submit — Submit completed work
router.post('/:id/submit', (req, res) => {
  const { fileName, size } = req.body;
  const db = readDB();

  const project = (db.projects || []).find(p => p.id === req.params.id);
  if (!project) {
    return res.status(404).json({ error: 'Project not found' });
  }

  const fileObj = {
    name: fileName || 'Project_Final_Deliverables.zip',
    size: size || '15.4 MB',
    date: 'Just now'
  };

  project.status = 'Submitted';
  project.stageIndex = 4;
  project.files.push(fileObj);
  project.messages.push({
    id: `m-${Date.now()}`,
    sender: 'system',
    text: `Work Submitted by student · File: ${fileObj.name}`,
    timestamp: 'Just now'
  });

  writeDB(db);
  res.json(project);
});

export default router;
