import React, { useEffect, useState } from 'react';
import './assets/css/style.css'
import NavBar from './NavBar';
import Slider from './Slider';
import Restaurant from './RestaurantModule';
import Place from './PlaceModule';
import AboutUs from './AboutUs';
import Blog from './Blog';
import Footer from './Footer';
import Hotel from './HotelModule';

const HomePage = () => {

  return (
    <>

      <NavBar></NavBar>

      <main>
        <article>

          <Slider></Slider>
          <Place></Place>
          <Restaurant></Restaurant>
          <AboutUs></AboutUs>
          <Hotel></Hotel>
          <Blog></Blog>
        </article>
      </main>

      <Footer></Footer>
    </>
  );
};

export default HomePage;
