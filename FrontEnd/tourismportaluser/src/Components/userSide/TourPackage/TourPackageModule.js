import { TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { IoStar, IoStarHalf, IoStarOutline } from 'react-icons/io5';


function TourPackage() {
  const [destinations, setDestinations] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [filteredDestinations, setFilteredDestinations] = useState([]);


  useEffect(() => {
    fetchData();
  }, [minPrice, maxPrice]);



  const fetchData = async () => {
    try {
      const response = await fetch('https://localhost:7036/api/Places');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const filteredData = data.filter(destination => {
        const tourCost = destination.tourCost;
        if (
          (minPrice === '' || tourCost >= parseInt(minPrice)) &&
          (maxPrice === '' || tourCost <= parseInt(maxPrice))
        ) {
          return true;
        }
        return false;
      });

      setDestinations(filteredData);
      setFilteredDestinations(filteredData);
      setDestinations(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <section className="section popular">
      <div className="container">
        <p className="section-subtitle">Featured Tours</p>
        <h2 className="h2 section-title">Most Popular Tours</h2>
        Filters: <br /><br />
        <div style={{ display: 'flex', gap: '16px' }}>
          <TextField
            type="number"
            label="Min Price"
            value={minPrice}
            onChange={e => setMinPrice(e.target.value)}
            variant="outlined"
            margin="dense"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            type="number"
            label="Max Price"
            value={maxPrice}
            onChange={e => setMaxPrice(e.target.value)}
            variant="outlined"
            margin="dense"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <br/><br/><br/>
        <ul className="popular-list">
          {filteredDestinations.map((destination, index) => (
            <li key={index} className="w-50">
              <div className="popular-card">
                <figure className="card-banner">
                  <a href="#">
                    <img src={`https://localhost:7036/uploads/place/${destination.placeImage}`} width="740" height="518" loading="lazy" alt="Kuala Lumpur, Malaysia" className="img-cover" />
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
                  <a href={`/tour-package-detailed/${destination.placeId}`} className="card-title">{destination.placeName}</a>
                  <p className="card-text">{destination.placeDescription}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default TourPackage