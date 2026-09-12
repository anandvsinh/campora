// ==========================================================================
// CAMPORA — Verified Student Talent Marketplace (Vanilla JS Logic)
// ==========================================================================

const MOCK_STUDENTS = [
  {
    id: 'aarav',
    name: 'Aarav Sharma',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    verified: true,
    college: 'GLA University',
    primarySkill: 'UI/UX & Brand Design',
    category: 'graphic-design',
    bio: 'Figma addict and poster designer for major campus fests. I turn rough ideas into crisp visuals.',
    rating: 4.9,
    reviewsCount: 18,
    completedProjects: 24,
    startingPrice: 499,
    availability: 'Available',
    trustScore: 94,
    badges: ['Verified Student', 'Rising Talent', 'Top Rated'],
    portfolioImg: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'priya',
    name: 'Priya Verma',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
    verified: true,
    college: 'IIT Delhi',
    primarySkill: 'Video Editing & Motion Graphics',
    category: 'video-editing',
    bio: 'Filmmaker and Premiere Pro/After Effects speed demon. Edited 40+ fest promos and viral Reels.',
    rating: 5.0,
    reviewsCount: 32,
    completedProjects: 38,
    startingPrice: 699,
    availability: 'Available',
    trustScore: 98,
    badges: ['Verified Student', 'Top Rated', '100% Reliable'],
    portfolioImg: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'rohan',
    name: 'Rohan Mehta',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    verified: true,
    college: 'DU South Campus',
    primarySkill: 'Full-Stack Web Development',
    category: 'coding',
    bio: 'React, Node.js, and Tailwind developer building fast web apps and event registration systems.',
    rating: 4.8,
    reviewsCount: 15,
    completedProjects: 19,
    startingPrice: 999,
    availability: 'Available',
    trustScore: 92,
    badges: ['Verified Student', 'Fast Responder'],
    portfolioImg: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'ananya',
    name: 'Ananya Iyer',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
    verified: true,
    college: 'NIFT Mumbai',
    primarySkill: 'Event & Portrait Photography',
    category: 'photography',
    bio: 'Sony Alpha shooter capturing real campus festival moments, fashion shows, and portraits.',
    rating: 4.9,
    reviewsCount: 26,
    completedProjects: 31,
    startingPrice: 850,
    availability: 'Available',
    trustScore: 95,
    badges: ['Verified Student', 'Campus Favorite'],
    portfolioImg: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80'
  }
];

let state = {
  role: 'guest',
  activeCategory: 'all',
  searchQuery: '',
  wishlist: ['aarav']
};

document.addEventListener('DOMContentLoaded', () => {
  renderStudentCards(MOCK_STUDENTS);
  setupEventListeners();
});

function renderStudentCards(studentsList) {
  const container = document.getElementById('students-grid');
  if (!container) return;

  container.innerHTML = studentsList.map(student => {
    const isSaved = state.wishlist.includes(student.id);
    return `
      <div class="glass-card student-card">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <div style="display: flex; gap: 12px; align-items: center;">
              <div style="position: relative;">
                <img src="${student.avatar}" alt="${student.name}" class="student-avatar" />
                <span class="availability-dot" style="position: absolute; bottom: 0; right: 0;"></span>
              </div>
              <div>
                <div style="display: flex; align-items: center; gap: 6px;">
                  <h3 style="font-weight: 700; font-size: 16px; color: #F0F9FF;">${student.name}</h3>
                  <span class="verified-badge">✓ Verified</span>
                </div>
                <div style="font-size: 12px; color: rgba(240,249,255,0.6);">${student.college}</div>
                <div style="font-size: 12px; font-weight: 600; color: #00B4D8; margin-top: 2px;">${student.primarySkill}</div>
              </div>
            </div>
            
            <button onclick="toggleWishlist('${student.id}')" style="background: none; border: none; color: ${isSaved ? '#F43F5E' : 'rgba(240,249,255,0.4)'}; cursor: pointer; font-size: 18px;">
              ${isSaved ? '♥' : '♡'}
            </button>
          </div>

          <p style="font-size: 12px; color: rgba(240,249,255,0.7); margin-top: 12px; line-height: 1.5;">
            ${student.bio}
          </p>

          <div style="display: flex; gap: 6px; margin-top: 12px;">
            ${student.badges.map(b => `<span style="font-size: 10px; padding: 2px 8px; border-radius: 4px; background: #0D1722; color: #00B4D8; border: 1px solid rgba(0,180,216,0.2);">${b}</span>`).join('')}
          </div>

          <div style="margin-top: 14px; border-radius: 12px; overflow: hidden; height: 110px;">
            <img src="${student.portfolioImg}" alt="Portfolio" style="width: 100%; height: 100%; object-fit: cover;" />
          </div>
        </div>

        <div style="margin-top: 16px; padding-top: 14px; border-top: 1px solid rgba(240,249,255,0.1); display: flex; justify-content: space-between; align-items: center;">
          <div>
            <div style="font-size: 12px; font-weight: 600; color: #F0F9FF;">★ ${student.rating} <span style="opacity: 0.5;">(${student.reviewsCount})</span></div>
            <div style="font-size: 12px; font-weight: 700; color: #00B4D8; margin-top: 2px;">Starting at ₹${student.startingPrice}</div>
          </div>
          <button onclick="openHireModal('${student.name}', ${student.startingPrice})" class="btn-primary" style="padding: 8px 16px; font-size: 12px;">
            Hire Student →
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function setupEventListeners() {
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value.toLowerCase();
      filterStudents();
    });
  }

  const roleSelect = document.getElementById('persona-select');
  if (roleSelect) {
    roleSelect.addEventListener('change', (e) => {
      state.role = e.target.value;
      alert(`Switched persona to: ${e.target.value.toUpperCase()}`);
    });
  }
}

function filterStudents() {
  const filtered = MOCK_STUDENTS.filter(s => {
    const matchCat = state.activeCategory === 'all' || s.category === state.activeCategory;
    const matchQuery = !state.searchQuery || 
      s.name.toLowerCase().includes(state.searchQuery) ||
      s.primarySkill.toLowerCase().includes(state.searchQuery) ||
      s.college.toLowerCase().includes(state.searchQuery);
    return matchCat && matchQuery;
  });
  renderStudentCards(filtered);
}

function setCategoryFilter(catId) {
  state.activeCategory = catId;
  filterStudents();
}

function toggleWishlist(id) {
  if (state.wishlist.includes(id)) {
    state.wishlist = state.wishlist.filter(item => item !== id);
  } else {
    state.wishlist.push(id);
  }
  filterStudents();
}

function openHireModal(studentName, price) {
  document.getElementById('modal-student-name').innerText = studentName;
  document.getElementById('modal-price').innerText = `₹${price}`;
  document.getElementById('hire-modal').style.display = 'flex';
}

function closeHireModal() {
  document.getElementById('hire-modal').style.display = 'none';
}

function submitHireRequest(e) {
  e.preventDefault();
  alert('🎉 Hiring Request Sent successfully! The student will accept the milestone request shortly.');
  closeHireModal();
}
