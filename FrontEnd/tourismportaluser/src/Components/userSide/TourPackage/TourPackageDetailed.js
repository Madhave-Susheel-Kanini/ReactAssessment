import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { IoStar, IoStarHalf, IoStarOutline } from 'react-icons/io5';
import { useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import axios from 'axios';

function TourPackageDetailed() {
  const [destination, setDestination] = useState(null);
  const [nextDestination, setNextDestination] = useState(null);
  const [allDestination, setAllDestination] = useState([]);
  const [hotel, setHotel] = useState();
  const [restaurant, setRestaurant] = useState();

  const { id } = useParams();

  

  useEffect(() => {
    fetchData(id);
    fetchDataNext(parseInt(id) + 1); // Parse the id to an integer before adding 1
    fetchRandomData();
    fetchAllHotels();
    fetchAllRestaurants();
  }, [id]);

  const fetchAllHotels = async () => {
    try {
      const response = await axios.get('https://localhost:7036/api/Hotels');
      const data = response.data;
      console.log('All Hotels:');
      console.log(data); // List all hotels in the console
  
      // Filter hotels based on place.placeId === 1
      const hotelsWithPlaceId1 = data.filter((hotel) => hotel.place.placeId === parseInt(id));
      console.log(`Total hotels with place.placeId === ${id}: ${hotelsWithPlaceId1.length}`);
  
      // Set the filtered hotels data in the state
      setHotel(hotelsWithPlaceId1);
    } catch (error) {
      console.error('Error fetching all hotels:', error);
    }
  };

  const fetchAllRestaurants = async () => {
    try {
      const response = await axios.get('https://localhost:7036/api/Restaurant');
      const data = response.data;
      console.log('All Restaurants:');
      console.log(data); // List all hotels in the console
  
      // Filter hotels based on place.placeId === 1
      const restaurantsWithPlaceId1 = data.filter((restaurant) => restaurant.place.placeId === parseInt(id));
      console.log(`Total hotels with place.placeId === ${id}: ${restaurantsWithPlaceId1.length}`);
  
      // Set the filtered hotels data in the state
      setRestaurant(restaurantsWithPlaceId1);
    } catch (error) {
      console.error('Error fetching all restaurants:', error);
    }
  };

  const fetchData = async (id) => {
    try {
      const response = await fetch(`https://localhost:7036/api/Places/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setDestination(data);
  
      // Check if hotels exist and print hotel names
      if (data.hotels && data.hotels.length > 0) {
        console.log('Hotel Names:');
        data.hotels.forEach((hotel) => {
          console.log(hotel.hotelName);
        });
      } else {
        console.log('No hotels found for the destination.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchRandomData = async () => {
    try {
      const response = await fetch('https://localhost:7036/api/Places');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const randomIndex = Math.floor(Math.random() * data.length); // Get a random index
      const randomDestination = data[randomIndex]; // Get the random destination
      setAllDestination([randomDestination]); // Convert the random destination into an array with a single item
    } catch (error) {
      console.error('Error fetching random data:', error);
    }
  };

  const fetchDataNext = async (id) => {
    try {
      const response = await fetch(`https://localhost:7036/api/Places/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setNextDestination(data);
    } catch (error) {
      setNextDestination('nextnull');
    }
  };

  return (
    <section className="section popular">
      <div className="container">
        {destination && nextDestination ? (
          <>
            <Grid container spacing={2}>
              <Grid item md={3}>
                <ul className="popular-list">
                  <li key={destination.placeId} className="w-100">
                    <div className="popular-card">
                      <figure className="card-banner">
                        <a href="#">
                          <img
                            src={`https://localhost:7036/uploads/place/${destination.placeImage}`}
                            width="740"
                            height="518"
                            loading="lazy"
                            alt="Kuala Lumpur, Malaysia"
                            className="img-cover"
                          />
                        </a>
                        <span className="card-badge">
                          {/* <IoTimeOutline /> */}
                          <time dateTime="P12D">{destination.totalDays} Days</time>
                        </span>
                      </figure>
                      <div className="card-content">
                        <div className="card-wrapper">
                          <div className="card-price">From Rs.{destination.tourCost}</div>
                          <div className="card-rating">
                            <IoStar />
                            <IoStar />
                            <IoStar />
                            <IoStarHalf />
                            <IoStarOutline />
                          </div>
                        </div>
                        <a href={`/booking/${destination.placeId}`} className="card-title">
                          {destination.placeName}
                        </a>
                        <p className="card-text">{destination.placeDescription}</p>
                      </div>
                    </div>
                  </li>
                </ul>
              </Grid>
              <Grid item md={6}>
                <Box sx={{ backgroundImage: `url(https://www.tailwindtap.com/_next/static/media/Line_Gradient.edf29691.svg)`, padding: '5%', height: '100%', borderRadius: '10px' }}>
                  <Typography sx={{ fontSize: '15px', fontWeight: '600' }}>Place Name</Typography><span style={{ fontSize: '18px' }}>{destination.placeName}</span><br />
                  <Typography sx={{ fontSize: '15px', fontWeight: '600' }}>Place Description</Typography><span style={{ fontSize: '18px' }}>{destination.placeDescription}</span><br />
                  <Typography sx={{ fontSize: '15px', fontWeight: '600' }}>Route</Typography><span style={{ fontSize: '18px' }}>{destination.route}</span><br />
                  <Typography sx={{ fontSize: '15px', fontWeight: '600' }}>Total Day(s)</Typography><span style={{ fontSize: '18px' }}>{destination.totalDays}</span><br />
                  <Typography sx={{ fontSize: '15px', fontWeight: '600' }}>Spots</Typography><span style={{ fontSize: '18px' }}>{destination.spots}</span><br />
                  <Typography sx={{ fontSize: '15px', fontWeight: '600' }}>Day Cost</Typography><span style={{ fontSize: '18px' }}>{destination.dayCost}</span><br />
                  <Typography sx={{ fontSize: '15px', fontWeight: '600' }}>Tour Cost</Typography><span style={{ fontSize: '18px' }}>{destination.tourCost}</span><br />
                  <Typography sx={{ fontSize: '15px', fontWeight: '600' }}>Max Distance</Typography><span style={{ fontSize: '18px' }}>{destination.maxDistance}</span><br />
                  <Button variant="outlined" href={`/booking/${destination.placeId}`}>Book Now</Button>
                </Box>
              </Grid>
              <Grid item md={3}>
                Browse More Packages...<br/><br/>
                {nextDestination === 'nextnull' ? (
                  allDestination.map((destinationItem) => (
                    <ul className="popular-list" key={destinationItem.placeId}>
                      <li className="w-100">
                        <div className="popular-card">
                          <figure className="card-banner">
                            <a href="#">
                              <img
                                src={`https://localhost:7036/uploads/place/${destinationItem.placeImage}`}
                                width="740"
                                height="518"
                                loading="lazy"
                                alt={destinationItem.placeName}
                                className="img-cover"
                              />
                            </a>
                            <span className="card-badge">
                              {/* <IoTimeOutline /> */}
                              <time dateTime="P12D">{destinationItem.totalDays} Days</time>
                            </span>
                          </figure>
                          <div className="card-content">
                            <div className="card-wrapper">
                              <div className="card-price">From Rs.{destinationItem.tourCost}</div>
                              <div className="card-rating">
                                <IoStar />
                                <IoStar />
                                <IoStar />
                                <IoStarHalf />
                                <IoStarOutline />
                              </div>
                            </div>
                            <a href={`/booking/${destinationItem.placeId}`} className="card-title">
                              {destinationItem.placeName}
                            </a>
                            <p className="card-text">{destinationItem.placeDescription}</p>
                          </div>
                        </div>
                      </li>
                    </ul>
                  ))
                ) : (
                  <ul className="popular-list">
                    <li key={nextDestination.placeId} className="w-100">
                      <div className="popular-card">
                        <figure className="card-banner">
                          <a href="#">
                            <img
                              src={`https://localhost:7036/uploads/place/${nextDestination.placeImage}`}
                              width="740"
                              height="518"
                              loading="lazy"
                              alt={nextDestination.placeName}
                              className="img-cover"
                            />
                          </a>
                          <span className="card-badge">
                            {/* <IoTimeOutline /> */}
                            <time dateTime="P12D">{nextDestination.totalDays} Days</time>
                          </span>
                        </figure>
                        <div className="card-content">
                          <div className="card-wrapper">
                            <div className="card-price">From Rs.{nextDestination.tourCost}</div>
                            <div className="card-rating">
                              <IoStar />
                              <IoStar />
                              <IoStar />
                              <IoStarHalf />
                              <IoStarOutline />
                            </div>
                          </div>
                          <a href={`/booking/${nextDestination.placeId}`} className="card-title">
                            {nextDestination.placeName}
                          </a>
                          <p className="card-text">{nextDestination.placeDescription}</p>
                        </div>
                      </div>
                    </li>
                  </ul>
                )}
              </Grid>
            </Grid>
          </>
        ) : (
          <Typography variant="h5">Loading...</Typography>
        )}

        {/* Use allDestination state instead of destination state */}
        <br /><br /><br />
        {hotel && hotel.length > 0 ? (
          <>
            <h2 className="h2 section-title">Most Popular Stays in this location</h2>
            <ul className="popular-list">
              {hotel.map((destinationItem) => (
                <li key={destinationItem.hotelId} className="w-50">
                  <div className="popular-card">
                    <figure className="card-banner">
                      <a href="#">
                        <img
                          src={`https://localhost:7036/uploads/Hotel/${destinationItem.hotelImage}`}
                          width="740"
                          height="518"
                          loading="lazy"
                          alt={destinationItem.hotelName}
                          className="img-cover"
                        />
                      </a>
                      <span className="card-badge">
                        {/* <IoTimeOutline /> */}
                        <time dateTime="P12D"><IoStar />
                          <IoStar />
                          <IoStar />
                          <IoStarHalf />
                          <IoStarOutline />
                        </time>
                      </span>
                    </figure>
                    <div className="card-content">
                      <div className="card-wrapper">
                        <div className="card-price">{destinationItem.hotelSubLocation}</div>
                        <div className="card-rating">
                        {destinationItem.hotelLocation}
                        </div>
                      </div>
                      <a href={`/tour-package-detailed/${destinationItem.hotelPincode}`} className="card-title">
                        {destinationItem.hotelName}
                      </a>
                      <a href={`/tour-package-detailed/${destinationItem.hotelPincode}`} className="card-title">
                        Pincode: {destinationItem.hotelPincode}
                      </a>
                      <p className="card-text">{destinationItem.hotelLocation}{destinationItem.hotelSubLocation}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <Typography></Typography>
        )}

        {restaurant && restaurant.length > 0 ? (
          <>
          <br/><br/><br/>
            <h2 className="h2 section-title">Most Popular Restaurants in this location</h2>
            <ul className="popular-list">
              {restaurant.map((destinationItem) => (
                <li key={destinationItem.restaurantId} className="w-50">
                  <div className="popular-card">
                    <figure className="card-banner">
                      <a href="#">
                        <img
                          src={`https://localhost:7036/uploads/Restaurant/${destinationItem.restaurantImage}`}
                          width="740"
                          height="518"
                          loading="lazy"
                          alt={destinationItem.restaurantName}
                          className="img-cover"
                        />
                      </a>
                      <span className="card-badge">
                        {/* <IoTimeOutline /> */}
                        <time dateTime="P12D"><IoStar />
                          <IoStar />
                          <IoStar />
                          <IoStarHalf />
                          <IoStarOutline />
                        </time>
                      </span>
                    </figure>
                    <div className="card-content">
                      <div className="card-wrapper">
                        <div className="card-price">{destinationItem.restaurantSubLocation}</div>
                        <div className="card-rating">
                        {destinationItem.restaurantLocation}
                        </div>
                      </div>
                      <a href={`/tour-package-detailed/${destinationItem.restaurantPincode}`} className="card-title">
                        {destinationItem.restaurantName}
                      </a>
                      <a href={`/tour-package-detailed/${destinationItem.restaurantPincode}`} className="card-title">
                        Pincode: {destinationItem.restaurantPincode}
                      </a>
                      <p className="card-text">{destinationItem.restaurantLocation}{destinationItem.restaurantSubLocation}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <Typography></Typography>
        )}
      </div>
    </section>
  );
}

export default TourPackageDetailed;
