import React, { createContext, useContext, useState, useEffect } from 'react';

const API_BASE = typeof window !== 'undefined' && window.location.hostname === 'localhost' 
  ? 'http://localhost:5000/api' 
  : '/api';
const AppContext = createContext();

export function AppProvider({ children }) {
  // Roles: 'guest', 'student', 'buyer', 'admin'
  const [currentRole, setCurrentRole] = useState('guest');
  // Tabs: 'home', 'discover', 'student-profile', 'service-detail', 'project-workspace', 'student-dashboard', 'buyer-dashboard', 'admin', 'wishlist', 'campus-hubs'
  const [currentTab, setCurrentTab] = useState('home');

  const [students, setStudents] = useState([]);
  const [projects, setProjects] = useState([]);
  const [verifications, setVerifications] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [wishlist, setWishlist] = useState(['student-aarav', 'student-priya']);

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  const [searchParams, setSearchParams] = useState({
    query: '',
    category: 'all',
    campus: 'all',
    maxPrice: 5000,
    minRating: 0
  });

  const [notifications, setNotifications] = useState([
    {
      id: 'notif-1',
      title: 'Backend API Connected',
      message: 'CAMPORA Express REST API (http://localhost:5000) active.',
      time: 'Just now',
      read: false
    }
  ]);

  // Fetch initial data from Express REST API
  useEffect(() => {
    fetchStudents();
    fetchProjects();
    fetchVerifications();
    fetchReviews();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await fetch(`${API_BASE}/students`);
      if (res.ok) {
        const data = await res.json();
        setStudents(data);
        if (data.length > 0 && !selectedStudent) {
          setSelectedStudent(data[0]);
          if (data[0].services && data[0].services.length > 0) {
            setSelectedService(data[0].services[0]);
          }
        }
      }
    } catch (err) {
      console.warn('Backend API offline, using fallback state', err);
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${API_BASE}/projects`);
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
        if (data.length > 0 && !selectedProject) {
          setSelectedProject(data[0]);
        }
      }
    } catch (err) {
      console.warn('Backend API offline', err);
    }
  };

  const fetchVerifications = async () => {
    try {
      const res = await fetch(`${API_BASE}/admin/verifications`);
      if (res.ok) {
        const data = await res.json();
        setVerifications(data);
      }
    } catch (err) {
      console.warn('Backend API offline', err);
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await fetch(`${API_BASE}/reviews`);
      if (res.ok) {
        const data = await res.json();
        setReviews(data);
      }
    } catch (err) {
      console.warn('Backend API offline', err);
    }
  };

  const switchRole = (role) => {
    setCurrentRole(role);
    if (role === 'student') setCurrentTab('student-dashboard');
    else if (role === 'buyer') setCurrentTab('buyer-dashboard');
    else if (role === 'admin') setCurrentTab('admin');
    else setCurrentTab('home');
  };

  const navigateTo = (tab, payload = null) => {
    setCurrentTab(tab);
    if (payload?.student) setSelectedStudent(payload.student);
    if (payload?.service) setSelectedService(payload.service);
    if (payload?.project) setSelectedProject(payload.project);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleWishlist = (studentId) => {
    setWishlist(prev => 
      prev.includes(studentId) 
        ? prev.filter(id => id !== studentId) 
        : [...prev, studentId]
    );
  };

  const createHiringRequest = async (requestData) => {
    try {
      const res = await fetch(`${API_BASE}/projects/hiring-request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData)
      });
      if (res.ok) {
        const newProj = await res.json();
        setProjects(prev => [newProj, ...prev]);
        setSelectedProject(newProj);
        navigateTo('project-workspace', { project: newProj });
        return;
      }
    } catch (err) {
      console.error('API Error creating hiring request', err);
    }
  };

  const updateProjectStatus = async (projectId, newStatus, stageIndex) => {
    try {
      const res = await fetch(`${API_BASE}/projects/${projectId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, stageIndex })
      });
      if (res.ok) {
        const updated = await res.json();
        setProjects(prev => prev.map(p => p.id === projectId ? updated : p));
        if (selectedProject?.id === projectId) setSelectedProject(updated);
      }
    } catch (err) {
      console.error('API Error updating project status', err);
    }
  };

  const sendChatMessage = async (projectId, text) => {
    if (!text.trim()) return;
    try {
      const res = await fetch(`${API_BASE}/projects/${projectId}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sender: currentRole === 'student' ? 'student' : 'buyer',
          senderName: currentRole === 'student' ? (selectedProject?.studentName || 'Student') : (selectedProject?.buyerName || 'Buyer'),
          text
        })
      });
      if (res.ok) {
        const newMsg = await res.json();
        setProjects(prev => prev.map(p => {
          if (p.id === projectId) {
            const updated = { ...p, messages: [...p.messages, newMsg] };
            if (selectedProject?.id === projectId) setSelectedProject(updated);
            return updated;
          }
          return p;
        }));
      }
    } catch (err) {
      console.error('API Error sending message', err);
    }
  };

  const submitWork = async (projectId, fileData) => {
    try {
      const res = await fetch(`${API_BASE}/projects/${projectId}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileName: fileData.name, size: fileData.size })
      });
      if (res.ok) {
        const updated = await res.json();
        setProjects(prev => prev.map(p => p.id === projectId ? updated : p));
        if (selectedProject?.id === projectId) setSelectedProject(updated);
      }
    } catch (err) {
      console.error('API Error submitting work', err);
    }
  };

  const submitReview = async (projectId, rating, comment) => {
    try {
      const res = await fetch(`${API_BASE}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId, rating, comment })
      });
      if (res.ok) {
        const newRev = await res.json();
        setReviews(prev => [newRev, ...prev]);
        fetchProjects();
        fetchStudents();
      }
    } catch (err) {
      console.error('API Error submitting review', err);
    }
  };

  const approveVerification = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/admin/verifications/${id}/approve`, {
        method: 'POST'
      });
      if (res.ok) {
        setVerifications(prev => prev.filter(v => v.id !== id));
      }
    } catch (err) {
      console.error('API Error approving verification', err);
    }
  };

  const rejectVerification = (id) => {
    setVerifications(prev => prev.filter(v => v.id !== id));
  };

  const value = {
    currentRole,
    switchRole,
    currentTab,
    navigateTo,
    students,
    selectedStudent,
    setSelectedStudent,
    selectedService,
    setSelectedService,
    projects,
    selectedProject,
    setSelectedProject,
    searchParams,
    setSearchParams,
    wishlist,
    toggleWishlist,
    notifications,
    createHiringRequest,
    updateProjectStatus,
    sendChatMessage,
    submitWork,
    submitReview,
    verifications,
    approveVerification,
    rejectVerification,
    reviews
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  return useContext(AppContext);
}
