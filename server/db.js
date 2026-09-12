import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, 'database.json');

// Initial Pre-Added Database Seeds
const INITIAL_DB = {
  students: [
    {
      id: 'student-aarav',
      name: 'Aarav Sharma',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      verified: true,
      college: 'GLA University',
      course: 'B.Tech Computer Science (3rd Year)',
      campus: 'GLA Mathura',
      primarySkill: 'UI/UX & Brand Design',
      category: 'graphic-design',
      bio: 'Figma addict and poster designer for major campus fests. I turn rough ideas into crisp visuals for startups and college clubs.',
      rating: 4.9,
      reviewsCount: 18,
      completedProjects: 24,
      startingPrice: 499,
      availability: 'Available',
      trustScore: 94,
      responseRate: '100%',
      repeatCustomers: 6,
      badges: ['Verified Student', 'Rising Talent', 'Top Rated', 'Fast Responder'],
      skills: ['Figma', 'Adobe Illustrator', 'Poster Design', 'Branding', 'UI/UX', 'Photoshop'],
      portfolio: [
        {
          id: 'p1',
          title: 'TechnoFest 2026 Official Poster & Identity',
          image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80',
          category: 'Graphic Design',
          description: 'Complete branding package including main event poster, Instagram carousel templates, and ID passes.'
        }
      ],
      services: [
        {
          id: 'srv-1',
          title: 'High-Impact College Fest Poster & Instagram Banner Pack',
          description: 'I will design 1 ultra-sleek main poster + 3 Instagram story formats for your college fest, workshop, or event.',
          price: 499,
          deliveryDays: 2,
          revisions: 3,
          rating: 4.9,
          salesCount: 14
        },
        {
          id: 'srv-2',
          title: 'Full Startup Landing Page UI Design in Figma',
          description: 'Complete desktop and mobile responsive UI layout in Figma with developer-ready design tokens.',
          price: 1499,
          deliveryDays: 4,
          revisions: 5,
          rating: 5.0,
          salesCount: 8
        }
      ],
      workHistory: [
        {
          projectTitle: 'TechnoFest 2026 Branding Pack',
          clientName: 'Apex Tech Society',
          completedDate: 'Sep 2026',
          amount: 1500,
          rating: 5
        }
      ]
    },
    {
      id: 'student-priya',
      name: 'Priya Verma',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
      verified: true,
      college: 'IIT Delhi',
      course: 'B.Des Design (4th Year)',
      campus: 'IIT Hauz Khas',
      primarySkill: 'Video Editing & Motion Graphics',
      category: 'video-editing',
      bio: 'Filmmaker and Premiere Pro/After Effects speed demon. Edited 40+ fest promos and viral Reels.',
      rating: 5.0,
      reviewsCount: 32,
      completedProjects: 38,
      startingPrice: 699,
      availability: 'Available',
      trustScore: 98,
      responseRate: '98%',
      repeatCustomers: 12,
      badges: ['Verified Student', 'Top Rated', '100% Reliable', 'Campus Favorite'],
      skills: ['Premiere Pro', 'After Effects', 'Color Grading', 'Sound Design'],
      portfolio: [
        {
          id: 'p4',
          title: 'Rendezvous IIT Delhi Official Teaser',
          image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80',
          category: 'Video Editing',
          description: 'Cinematic 60-second festival launch trailer featuring 3D text tracking.'
        }
      ],
      services: [
        {
          id: 'srv-3',
          title: 'Viral Instagram Reels & Shorts Edit with Beat Sync',
          description: 'I will turn raw video clips into a punchy, color-graded Reel with kinetic captions & sound effects.',
          price: 699,
          deliveryDays: 1,
          revisions: 2,
          rating: 5.0,
          salesCount: 22
        },
        {
          id: 'srv-4',
          title: 'Fest Aftermovie & 3D Motion Graphic Teaser',
          description: 'High energy 60-second festival aftermovie with kinetic 3D typography and sound design.',
          price: 2200,
          deliveryDays: 3,
          revisions: 3,
          rating: 5.0,
          salesCount: 12
        }
      ],
      workHistory: []
    },
    {
      id: 'student-rohan',
      name: 'Rohan Mehta',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      verified: true,
      college: 'DU South Campus',
      course: 'B.Sc Computer Science (2nd Year)',
      campus: 'Delhi University',
      primarySkill: 'Full-Stack Web Development',
      category: 'coding',
      bio: 'React, Node.js, and Tailwind CSS developer. I build fast web apps, event registration portals, and websites.',
      rating: 4.8,
      reviewsCount: 15,
      completedProjects: 19,
      startingPrice: 999,
      availability: 'Available',
      trustScore: 92,
      responseRate: '95%',
      repeatCustomers: 4,
      badges: ['Verified Student', 'Rising Talent', 'Fast Responder'],
      skills: ['React', 'Next.js', 'Tailwind CSS', 'Node.js'],
      portfolio: [
        {
          id: 'p6',
          title: 'Campus Club Ticketing Platform',
          image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
          category: 'Web Development',
          description: 'Full stack app handling QR code tickets and Instant Razorpay payments.'
        }
      ],
      services: [
        {
          id: 'srv-5',
          title: 'Custom React Web Application & Portfolio Site',
          description: 'Fully responsive single page website built with React/Vite, sleek animations, and contact form.',
          price: 1499,
          deliveryDays: 3,
          revisions: 4,
          rating: 4.8,
          salesCount: 12
        }
      ],
      workHistory: []
    },
    {
      id: 'student-ananya',
      name: 'Ananya Iyer',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
      verified: true,
      college: 'NIFT Mumbai',
      course: 'B.Des Fashion Communication',
      campus: 'NIFT Campus',
      primarySkill: 'Event & Portrait Photography',
      category: 'photography',
      bio: 'Sony Alpha shooter capturing real moments at campus festivals, graduation ceremonies, and portraits.',
      rating: 4.9,
      reviewsCount: 26,
      completedProjects: 31,
      startingPrice: 850,
      availability: 'Available',
      trustScore: 95,
      responseRate: '100%',
      repeatCustomers: 8,
      badges: ['Verified Student', 'Top Rated', '100% Reliable'],
      skills: ['Sony Alpha', 'Lightroom Editing', 'Event Photography'],
      portfolio: [
        {
          id: 'p7',
          title: 'NIFT Annual Fashion Gala 2026',
          image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
          category: 'Photography',
          description: 'Covered 12 runway shows with high-resolution retouched deliverables.'
        }
      ],
      services: [
        {
          id: 'srv-6',
          title: '2-Hour Campus Event Photography + 40 Retouched Photos',
          description: 'Professional DSLR coverage of your club fest, speaker session, or team photoshoot.',
          price: 850,
          deliveryDays: 2,
          revisions: 2,
          rating: 4.9,
          salesCount: 19
        }
      ],
      workHistory: []
    }
  ],

  openJobs: [
    {
      id: 'job-501',
      title: 'Hackathon Demo Video & Reel Pitch Edit',
      posterName: 'Team Cypher (GDSC)',
      posterAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      campus: 'GLA University',
      category: 'video-editing',
      budget: 2500,
      deadline: '2026-09-25',
      status: 'Open',
      description: 'Looking for a video editor to edit a 60-second high energy project pitch reel for smart campus hackathon.',
      postedAt: 'Sep 12, 2026'
    },
    {
      id: 'job-502',
      title: 'E-Cell Annual Summit Sponsorship Pitch Deck',
      posterName: 'E-Cell IIT Delhi',
      posterAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80',
      campus: 'IIT Delhi',
      category: 'graphic-design',
      budget: 3500,
      deadline: '2026-09-28',
      status: 'Open',
      description: 'Need a designer to create a 12-page high-converting Figma pitch deck for corporate sponsors.',
      postedAt: 'Sep 12, 2026'
    }
  ],

  projects: [
    {
      id: 'proj-101',
      title: 'TechnoFest 2026 Official Poster & Identity',
      buyerName: 'Apex Tech Society',
      buyerAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80',
      studentId: 'student-aarav',
      studentName: 'Aarav Sharma',
      serviceId: 'srv-1',
      budget: 1500,
      platformFee: 150,
      studentNetEarnings: 1350,
      deadline: '2026-09-20',
      status: 'In Progress',
      stageIndex: 3,
      description: 'High energy dark neon poster for TechnoFest 2026 with 3 custom Instagram story carousel formats.',
      requirements: 'Colors: Dark Teal & Cyan gradient. Include GDSC logo and dates Sep 25-27.',
      files: [
        { name: 'TechnoFest_Brand_Brief.pdf', size: '2.4 MB', date: 'Sep 12, 2026' }
      ],
      messages: [
        {
          id: 'm1',
          sender: 'system',
          text: 'Project accepted by Aarav Sharma · Budget: ₹1,500 · Due Sep 20, 2026',
          timestamp: 'Sep 12, 10:30 AM'
        },
        {
          id: 'm2',
          sender: 'buyer',
          senderName: 'Apex Tech Society',
          text: 'Hey Aarav! Did you check the sponsor logo SVGs in the brief file?',
          timestamp: 'Sep 12, 10:35 AM'
        },
        {
          id: 'm3',
          sender: 'student',
          senderName: 'Aarav Sharma',
          text: 'Hey! Yes, got all the vectors. Working on 2 initial poster concepts right now!',
          timestamp: 'Sep 12, 10:42 AM'
        }
      ]
    }
  ],

  reviews: [
    {
      id: 'rev-1',
      studentId: 'student-aarav',
      buyerName: 'Google Developer Student Club',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80',
      rating: 5,
      date: 'Aug 28, 2026',
      projectTitle: 'Hackathon Hero Banner Design',
      comment: 'Aarav delivered the main poster within 24 hours and the quality was outstanding!'
    }
  ],

  verifications: [
    {
      id: 'ver-801',
      studentName: 'Siddharth Rao',
      college: 'GLA University',
      rollNumber: '2115000982',
      email: 'siddharth.rao_cs22@gla.ac.in',
      idCardDoc: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80',
      submittedAt: 'Sep 12, 2026',
      skillCategory: 'Coding & Web Dev'
    }
  ]
};

// Initialize DB file
export function initDB() {
  fs.writeFileSync(DB_FILE, JSON.stringify(INITIAL_DB, null, 2));
}

export function readDB() {
  if (!fs.existsSync(DB_FILE)) {
    initDB();
  }
  const data = fs.readFileSync(DB_FILE, 'utf-8');
  return JSON.parse(data);
}

export function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}
