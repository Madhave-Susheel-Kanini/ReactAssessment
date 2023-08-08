import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

function Gallery() {
  const [gallery, setGallery] = useState([]);
  const initialFormData = {
    Gname: '',
    GalImage: null,
  };
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    // Fetch hotel data from your API endpoint
    const fetchGallery = async () => {
      try {
        const response = await axios.get("https://localhost:7029/api/Galleries");
        setGallery(response.data);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    };

    fetchGallery();
  }, []);

  return (
      <section className="section popular">
        <div className="container">
          <h2 className="h2 section-title">Our Portfolio</h2>
          <ul className="popular-list">
          {gallery.map((Gallery) => (
              <li key={Gallery.galId} className="w-50">
                <div className="popular-card">
                  <figure className="card-banner">
                    <a href="#">
                      <img src={Gallery.galImage} width="740" height="518" loading="lazy" alt="Kuala Lumpur, Malaysia" className="img-cover" />
                    </a>
                  </figure>
                  <div className="card-content">
                    <a href="#" className="card-title">{Gallery.galName}</a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
  );
}

export default Gallery;