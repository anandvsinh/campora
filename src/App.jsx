import React from 'react';
import { useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustStrip from './components/TrustStrip';
import DiscoverSection from './components/DiscoverSection';
import TrendingTalent from './components/TrendingTalent';
import CategoryGrid from './components/CategoryGrid';
import HowItWorks from './components/HowItWorks';
import ReputationSection from './components/ReputationSection';
import CampusHubs from './components/CampusHubs';
import ClubsSection from './components/ClubsSection';
import PricingModel from './components/PricingModel';
import Footer from './components/Footer';

// Inner View Components
import DiscoverPage from './components/DiscoverPage';
import JobBoard from './components/JobBoard';
import StudentProfileView from './components/StudentProfileView';
import ServiceDetailModal from './components/ServiceDetailModal';
import ProjectWorkspace from './components/ProjectWorkspace';
import StudentDashboard from './components/StudentDashboard';
import BuyerDashboard from './components/BuyerDashboard';
import AdminDashboard from './components/AdminDashboard';

export default function App() {
  const { currentTab } = useApp();

  return (
    <div className="min-h-screen bg-[#070D14] text-[#F0F9FF] flex flex-col justify-between selection:bg-[#00B4D8] selection:text-[#070D14]">
      
      <div>
        {/* Navigation Bar */}
        <Navbar />

        {/* Dynamic Route View Rendering */}
        <main>
          {currentTab === 'home' && (
            <>
              <Hero />
              <TrustStrip />
              <DiscoverSection />
              <TrendingTalent />
              <CategoryGrid />
              <HowItWorks />
              <ReputationSection />
              <CampusHubs />
              <ClubsSection />
              <PricingModel />
            </>
          )}

          {currentTab === 'discover' && <DiscoverPage />}
          {currentTab === 'job-board' && <JobBoard />}
          {currentTab === 'campus-hubs' && (
            <div className="pt-6">
              <CampusHubs />
            </div>
          )}
          {currentTab === 'wishlist' && <BuyerDashboard />}
          {currentTab === 'student-profile' && <StudentProfileView />}
          {currentTab === 'service-detail' && <ServiceDetailModal />}
          {currentTab === 'project-workspace' && <ProjectWorkspace />}
          {currentTab === 'student-dashboard' && <StudentDashboard />}
          {currentTab === 'buyer-dashboard' && <BuyerDashboard />}
          {currentTab === 'admin' && <AdminDashboard />}
        </main>
      </div>

      {/* Footer */}
      <Footer />

    </div>
  );
}
