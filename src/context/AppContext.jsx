import React, { createContext, useContext, useState, useEffect } from 'react';

const API_BASE = typeof window !== 'undefined' && window.location.hostname === 'localhost' 
  ? 'http://localhost:5000/api' 
  : '/api';
const AppContext = createContext();

export function AppProvider({ children }) {
  // Roles: 'guest', 'student', 'buyer', 'admin'
  const [currentRole, setCurrentRole] = useState('guest');
  // Tabs: 'home', 'discover', 'job-board', 'student-profile', 'service-detail', 'project-workspace', 'student-dashboard', 'buyer-dashboard', 'admin', 'wishlist', 'campus-hubs'
  const [currentTab, setCurrentTab] = useState('home');

  const [gigs, setGigs] = useState([]);
  const [students, setStudents] = useState([]);
  const [projects, setProjects] = useState([]);
  const [openJobs, setOpenJobs] = useState([]);
  const [verifications, setVerifications] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [wishlist, setWishlist] = useState(['student-aarav', 'student-priya']);

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

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
      message: 'CAMPORA Express REST API active.',
      time: 'Just now',
      read: false
    }
  ]);

  // Fetch initial data from Express REST API
  useEffect(() => {
    fetchGigs();
    fetchStudents();
    fetchProjects();
    fetchOpenJobs();
    fetchVerifications();
    fetchReviews();
  }, []);

  const fetchGigs = async () => {
    try {
      const res = await fetch(`${API_BASE}/students/gigs`);
      if (res.ok) {
        const data = await res.json();
        setGigs(data);
      }
    } catch (err) {
      console.warn('Backend API offline fetching gigs', err);
    }
  };

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
      console.warn('Backend API offline', err);
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

  const fetchOpenJobs = async () => {
    try {
      const res = await fetch(`${API_BASE}/projects/open-jobs`);
      if (res.ok) {
        const data = await res.json();
        setOpenJobs(data);
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

  // Publish a new skill gig (Admin or Student) with instant frontend & backend sync
  const publishGig = async (gigData) => {
    try {
      const res = await fetch(`${API_BASE}/students/gigs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(gigData)
      });
      if (res.ok) {
        const newGig = await res.json();
        setGigs(prev => [newGig, ...prev]);
        setNotifications(prev => [
          {
            id: `n-${Date.now()}`,
            title: 'Skill Gig Added Live!',
            message: `Gig "${newGig.title}" is now active in the marketplace.`,
            time: 'Just now',
            read: false
          },
          ...prev
        ]);
        return newGig;
      }
    } catch (err) {
      console.error('API Error publishing gig', err);
    }
  };

  // Delete a skill gig (Admin moderation)
  const deleteGig = async (gigId) => {
    try {
      const res = await fetch(`${API_BASE}/students/gigs/${gigId}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setGigs(prev => prev.filter(g => g.id !== gigId));
        setNotifications(prev => [
          {
            id: `n-${Date.now()}`,
            title: 'Gig Removed',
            message: `Skill gig was removed by platform admin.`,
            time: 'Just now',
            read: false
          },
          ...prev
        ]);
      }
    } catch (err) {
      console.error('API Error deleting gig', err);
    }
  };

  // Publish a new skill service (Students) with instant frontend & backend sync
  const publishService = async (serviceData) => {
    try {
      const res = await fetch(`${API_BASE}/students/gigs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(serviceData)
      });
      if (res.ok) {
        const data = await res.json();
        
        setGigs(prev => [data, ...prev]);
        setStudents(prev => prev.map(s => {
          if (s.id === (serviceData.studentId || 'student-aarav')) {
            return {
              ...s,
              services: [data, ...(s.services || [])]
            };
          }
          return s;
        }));

        setNotifications(prev => [
          {
            id: `n-${Date.now()}`,
            title: 'Skill Published Live!',
            message: `Service "${serviceData.title}" is now live in the marketplace.`,
            time: 'Just now',
            read: false
          },
          ...prev
        ]);
        
        navigateTo('discover');
      }
    } catch (err) {
      console.error('API Error publishing service', err);
    }
  };

  // Post a new open campus job requirement (Buyers/Clubs)
  const postCampusJob = async (jobData) => {
    try {
      const res = await fetch(`${API_BASE}/projects/open-jobs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jobData)
      });
      if (res.ok) {
        const newJob = await res.json();
        setOpenJobs(prev => [newJob, ...prev]);
        setNotifications(prev => [
          {
            id: `n-${Date.now()}`,
            title: 'Job Requirement Posted!',
            message: `"${jobData.title}" is now visible on the Campus Job Board.`,
            time: 'Just now',
            read: false
          },
          ...prev
        ]);
        navigateTo('job-board');
      }
    } catch (err) {
      console.error('API Error posting job', err);
    }
  };

  // Admin moderation: Delete Service
  const deleteService = async (serviceId) => {
    try {
      const res = await fetch(`${API_BASE}/students/services/${serviceId}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setStudents(prev => prev.map(s => ({
          ...s,
          services: (s.services || []).filter(srv => srv.id !== serviceId)
        })));
      }
    } catch (err) {
      console.error('API Error deleting service', err);
    }
  };

  // Admin moderation: Delete Open Job Post
  const deleteJob = async (jobId) => {
    try {
      const res = await fetch(`${API_BASE}/projects/open-jobs/${jobId}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setOpenJobs(prev => prev.filter(j => j.id !== jobId));
      }
    } catch (err) {
      console.error('API Error deleting job', err);
    }
  };

  // Admin password login verification
  const verifyAdminPassword = async (password) => {
    const pwd = (password || '').trim();
    if (pwd === 'admin123' || pwd === 'admin' || pwd === 'campora2026') {
      setIsAdminAuthenticated(true);
      return true;
    }
    try {
      const res = await fetch(`${API_BASE}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pwd })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setIsAdminAuthenticated(true);
          return true;
        }
      }
    } catch (err) {
      console.error('Admin auth API error', err);
    }
    return false;
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
    gigs,
    setGigs,
    publishGig,
    deleteGig,
    students,
    selectedStudent,
    setSelectedStudent,
    selectedService,
    setSelectedService,
    projects,
    selectedProject,
    setSelectedProject,
    openJobs,
    publishService,
    postCampusJob,
    deleteService,
    deleteJob,
    verifyAdminPassword,
    isAdminAuthenticated,
    setIsAdminAuthenticated,
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
