import React, { useEffect, useState } from 'react';

function RestaurantModule() {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://localhost:7036/api/Restaurant');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setDestinations(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  return (
    <section className="section destination">
      <div className="container">
        <p className="section-subtitle">Latest Dine-In</p>
        <h2 className="h2 section-title">Choose Your Dine</h2>
        <ul className="destination-list">
          {destinations.slice(0, 2).map((destination, index) => (
            <li key={index} className="w-50">
              <a href="#" className="destination-card">
                <figure className="card-banner">
                  <img src={`https://localhost:7036/uploads/Restaurant/${destination.restaurantImage}`} width="1140" height="1100" loading="lazy" alt="Malé, Maldives" className="img-cover" />
                </figure>
                <div className="card-content">
                  <p className="card-subtitle">{destination.restaurantName}</p>
                  <h3 className="h3 card-title">{destination.restaurantLocation}</h3>
                </div>
              </a>
            </li>
          ))}
          {destinations.slice(2).map((destination, index) => (
            <li key={index}>
              <a href="#" className="destination-card">
                <figure className="card-banner">
                  <img src={`https://localhost:7036/uploads/Restaurant/${destination.restaurantImage}`} width="1110" height="480" loading="lazy" alt="Kuala Lumpur, Malaysia" className="img-cover-rectangle" />
                </figure>
                <div className="card-content">
                  <p className="card-subtitle">{destination.restaurantName}</p>
                  <h3 className="h3 card-title">{destination.restaurantLocation}</h3>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default RestaurantModule;
