import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography} from '@mui/material';
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
        const response = await axios.get("https://localhost:7029/api/Galleries", 
        {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        });
        setGallery(response.data);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    };

    fetchGallery();
  }, []);

  return (
    <Box sx={{ backgroundColor: '#F0F4F7', height: '97vh', p: 2 }}>
            <Box sx={{ padding: '3%', backgroundColor: 'white', borderRadius: '10px' }}>
      <Grid container spacing={'1%'}>
     {gallery.map((Gallery) => (
        <Grid item xs={12} sm={6} md={3} key={Gallery.galId}>
            <Card sx={{ marginRight: '2%', marginBottom: '2%' }}>

                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="140"
                        image= {Gallery.galImage }
                        alt="Conference Room"
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
       
                        </Typography>
                        <Typography gutterBottom sx={{ fontWeight: '600' }} component="div">
                            {Gallery.galName}
                        </Typography>
                    </CardContent>

                </CardActionArea>
               
            </Card>
        </Grid>
        
        ))}
        </Grid>
        </Box>
        </Box>
  );
}

export default Gallery;