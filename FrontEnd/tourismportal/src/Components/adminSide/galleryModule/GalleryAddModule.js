import { Button, TextField } from '@mui/material';
import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

function GalleryAdd() {
    const initialFormData = {
      Gname: '',
      GalImage: null,
    };
    const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
  
    // If the input is a file input (for the image), update the state with the selected file
    if (name === 'GalImage') {
      const selectedImage = files[0];
      setFormData({
        ...formData,
        GalImage: selectedImage,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const apiEndpoint = 'https://localhost:7029/api/Galleries'; // Adjust the endpoint to match your server

    // Create a FormData object to send the form data as a multipart/form-data request
    const formDataToSend = new FormData();
    formDataToSend.append('Gname', formData.Gname);
    formDataToSend.append('GalImage', formData.GalImage);

    // Send the form data to the API endpoint using Axios
    axios.post(apiEndpoint, formDataToSend,
        {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        })
    .then((response) => {
      // Handle the success response here
      console.log('Hotel added successfully:', response.data);
      // Clear the form data
      setFormData(initialFormData);
      // You can also refresh the gallery data after successful addition
      
    })
    .catch((error) => {
      // Handle the error response here
      console.error('Error adding hotel:', error);
      console.error('Error response data:', error.response.data);
    });
};

  return (
    <div>
      
<form onSubmit={handleSubmit}>
<TextField
          label="Hotel Name"
          variant="outlined"
          name="Gname"
          value={formData.Gname}
          onChange={handleChange}
          margin="normal"
          InputLabelProps={{ shrink: true }}
          required
        /><br/>
        <input
          type="file"
          name="GalImage"
          accept="image/*"
          onChange={handleChange}
          required
        />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
    </div>
  )
}

export default GalleryAdd