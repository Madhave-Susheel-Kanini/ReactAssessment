import { Box } from '@mui/system';
import './App.css';
import BookingPage from './Components/userSide/BookingPage/BookingPage';
import HomePage from './Components/userSide/HomePage/HomePage';
import NavBar from './Components/userSide/HomePage/NavBar';
import TourPackage from './Components/userSide/TourPackage/TourPackageModule';
import RestaurantModule from './Components/userSide/RestaurantModule/RestaurantModule';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HotelModule from './Components/userSide/HomePage/HotelModule';
import UserSignIn from './Components/userSide/SignIn-SignUp Module/UserSignIn';
import TourPackageDetailed from './Components/userSide/TourPackage/TourPackageDetailed';
import YourBookings from './Components/userSide/HomePage/YourBookings';
import FeedBack from './Components/userSide/TourPackage/Feedback';
import Gallery from './Components/userSide/galleryModule/GalleryModule';


function App() {
  return (
    <>
      <Box className='navhere'>
        <NavBar />
      </Box>
      <Box sx={{ marginTop: '80px' }}>
        <Router>
          <Routes>
            <Route path="/booking/:id" element={<BookingPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/tour" element={<TourPackage />} />
            <Route path="/hotel" element={<HotelModule />} />
            <Route path="/restaurant" element={<RestaurantModule />} />
            {/* Add a default route for unknown paths */}
            <Route path="/" element={<HomePage />} />
            <Route path="/user" element={<UserSignIn />} />
            <Route path="/your-bookings" element={<YourBookings />} />
            <Route path="/tour-package-detailed/:id" element={<TourPackageDetailed />} />
            <Route path="/feedback/:id" element={<FeedBack />} />
            <Route path="/gallery" element={<Gallery />} />
          </Routes>
        </Router>
      </Box>
    </>
  );
}

export default App;
