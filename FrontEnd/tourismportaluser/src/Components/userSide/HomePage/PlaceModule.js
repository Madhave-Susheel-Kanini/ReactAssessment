import React, { useEffect, useState } from 'react'
import popular1 from './assets/images/popular-1.jpg';
import popular2 from './assets/images/popular-2.jpg';
import popular3 from './assets/images/popular-3.jpg';
import { IoTimeOutline, IoStar, IoStarHalf, IoStarOutline } from 'react-icons/io5';


function PlaceModule() {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://localhost:7036/api/Places');
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
    <section className="section popular">
      <div className="container">
        <p className="section-subtitle">Featured Tours</p>
        <h2 className="h2 section-title">Most Popular Tours</h2>
        <ul className="popular-list">
          {destinations.map((destination, index) => (
            <li key={index} className="w-50">
              <div className="popular-card">
                <figure className="card-banner">
                <a href={`/tour-package-detailed/${destination.placeId}`}>
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

export default PlaceModule