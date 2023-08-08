import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import AddNewTourism from './Components/agentSide/tourismModule/addNewTourism/AddNewTourism';
import SideBar from './Components/sideBar/SideBar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import AddHotels from './Components/agentSide/hotelModule/addHotels/AddHotels';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import AddRestaurant from './Components/agentSide/restaurantModule/addRestaurant/AddRestaurant';
import ActionTourism from './Components/agentSide/tourismModule/actionTourism/ActionTourism';
import ActionRestaurant from './Components/agentSide/restaurantModule/actionRestaurant/ActionRestaurant';
import ActionHotel from './Components/agentSide/hotelModule/actionHotels/ActionHotel';
import LinearProgress from '@mui/material/LinearProgress';
import AdminLogin from './Components/adminSide/loginModule/AdminSignIn';
import AdminSignUp from './Components/adminSide/signUpModule/AdminSignup';
import AgentSignIn from './Components/agentSide/loginModule/AgentSignIn';
import AgentSignUp from './Components/agentSide/signUpModule/AgentSignUp';
import ActionAgent from './Components/adminSide/agentApprovalModule/actionAgentApproval/AgentApproval';
import Gallery from './Components/adminSide/galleryModule/GalleryModule';
import GalleryAdd from './Components/adminSide/galleryModule/GalleryAddModule';
import LogoutAgent from './Components/logOut/LogoutAgent';
import LogoutAdmin from './Components/logOut/LogoutAdmin';
import NotFound from './Components/sideBar/NotFound';
import Feedback from './Components/adminSide/feedBack/FeedBack';
import ApprovalCheck from './Components/agentSide/approvalCheck/ApprovalCheck';

const MainContent = ({ showSidebarAndTitle }) => {
  const [sidebarVisible, setSidebarVisible] = useState(window.innerWidth >= 1000);

  const toggleSidebar = () => {
    if (window.innerWidth < 1000) {
      setSidebarVisible(!sidebarVisible);
    }
  };

  useEffect(() => {
    const handleWindowResize = () => {
      setSidebarVisible(window.innerWidth >= 1000);
    };

    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        sx={{
          flex: '0 0 280px 20px',
          transform: `translateX(${sidebarVisible && showSidebarAndTitle ? '0%' : '-100%'})`,
          transition: 'transform 0.3s ease',
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
        }}
      >
        <SideBar />
      </Box>
      {/* Right Grid */}
      <Box
        sx={{
          flex: '1',
          marginLeft: (showSidebarAndTitle && sidebarVisible) ? '300px' : '0',
          marginRight: '20px',
          transition: 'margin-left 0.3s ease',
          position: 'relative',
        }}
      >
        {/* Main Content */}
        <Box
          sx={{
            height: '80px',
            boxShadow: '0px 4px 4px -2px rgba(0, 0, 0, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 16px',
          }}
        >
          {window.innerWidth < 1000 && (
            <IconButton
              onClick={toggleSidebar}
              style={{ zIndex: 1 }}
              color="inherit"
              aria-label={sidebarVisible ? 'Hide Sidebar' : 'Show Sidebar'}
            >
              {sidebarVisible ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          )}
          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: '20px', fontWeight: '600' }}>Home</span>
            <span style={{ fontSize: '15px', color: 'grey', marginLeft: '8px' }}>DASHBOARD</span>
          </Box>
        </Box>
        <Box sx={{ marginTop: '1%' }}>
          <Routes>
            <Route path="/add-tourism" element={<AddNewTourism />} />
            <Route path="/add-hotel" element={<AddHotels />} />
            <Route path="/add-restaurant" element={<AddRestaurant />} />
            <Route path="/action-tourism" element={<ActionTourism />} />
            <Route path="/action-restaurant" element={<ActionRestaurant />} />
            <Route path="/action-hotel" element={<ActionHotel />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin-signup" element={<AdminSignUp />} />
            <Route path="/agent" element={<AgentSignIn />} />
            <Route path="/agent-signup" element={<AgentSignUp />} />
            <Route path="/action-agent" element={<ActionAgent />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/action-gallery" element={<GalleryAdd />} />
            <Route path="/logout-agent" element={<LogoutAgent />} />
            <Route path="/logout-admin" element={<LogoutAdmin />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Home />} />
            <Route path="/not-approved" element={<ApprovalCheck />} />
            <Route path="/feedback-view" element={<Feedback />} />
            {/* Add more routes here */}
          </Routes>
        </Box>
      </Box>
    </Box>
  );
}

function App() {
  const location = window.location.pathname;
  const hideSidebarAndTitle = ['/agent', '/admin', '/Agent', '/Admin', '/agent-signup', '/admin-signup', '/not-approved'];
  const shouldHideSidebarAndTitle = hideSidebarAndTitle.includes(location);

  return (
    <Router>
      <MainContent showSidebarAndTitle={!shouldHideSidebarAndTitle} />
    </Router>
  );
}

function Home() {
  return <div>Welcome to the Dashboard</div>;
}

function NotApproved() {
  return <div>Please wait until you are Verified...</div>;
}

export default App;