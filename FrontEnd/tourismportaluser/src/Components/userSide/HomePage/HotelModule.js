import React, { useEffect, useState } from 'react';
import axios from 'axios';

function HotelModule() {
  const [destinations, setDestinations] = useState([]); 
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://localhost:7036/api/Hotels');
      const data = response.data;
      setDestinations(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const firstDestination = destinations.slice(0, 2);

  return (
    <section className="section destination">
      <div className="container">
        <p className="section-subtitle">Latest Dine-In</p>
        <h2 className="h2 section-title">Choose Your Dine</h2>
        <ul className="destination-list">
          {firstDestination.map((destination, index) => (
            <li key={index} className="w-50">
              <a href="#" className="destination-card">
                <figure className="card-banner">
                  <img src={`https://localhost:7036/uploads/Hotel/${destination.hotelImage}`} width="1140" height="1100" loading="lazy" alt="Malé, Maldives" className="img-cover" />
                </figure>
                <div className="card-content">
                  <p className="card-subtitle">{destination.hotelName}</p>
                  <h3 className="h3 card-title">{destination.hotelLocation}</h3>
                </div>
              </a>
            </li>
          ))}
          {firstDestination.map((destination, index) => (
          <li key={index}>
            <a href="#" className="destination-card" >
              <figure className="card-banner">
                <img src={`https://localhost:7036/uploads/Hotel/${destination.hotelImage}`} width="1110" height="480" loading="lazy" alt="Kuala Lumpur, Malaysia" className="img-cover-rectangle" />
              </figure>
              <div className="card-content">
                <p className="card-subtitle">{destination.hotelName}</p>
                <h3 className="h3 card-title">{destination.hotelLocation}</h3>
              </div>
            </a>
          </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default HotelModule;
