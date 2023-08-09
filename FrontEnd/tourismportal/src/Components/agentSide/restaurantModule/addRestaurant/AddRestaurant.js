import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Grid, Typography } from '@mui/material';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function AddRestaurant() {

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const showSnackbar = (message, severity) => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    };

    const initialFormData = {
        restaurantName: '',
        restaurantLocation: '',
        restaurantSubLocation: '',
        restaurantPincode: '',
        restaurantImage: '',
        restaurantContact: '',
        imageFile: null,
        place: {
            placeId: 0,
        },
    };

    const [formData, setFormData] = useState(initialFormData);
    const fileInputRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'place.placeId') {
            setFormData((prevData) => ({
                ...prevData,
                place: {
                    ...prevData.place,
                    placeId: value,
                },
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData((prevData) => ({
            ...prevData,
            imageFile: file,
        }));
        console.log(file); // Add this line to check the selected file in the console
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        

        console.log(formData);

        const data = new FormData();
        data.append('restaurantName', formData.restaurantName);
        data.append('restaurantLocation', formData.restaurantLocation);
        data.append('restaurantSubLocation', formData.restaurantSubLocation);
        data.append('restaurantPincode', formData.restaurantPincode);
        data.append('restaurantImage', formData.restaurantImage);
        data.append('restaurantContact', formData.restaurantContact);
        data.append('imageFile', formData.imageFile);
        data.append('place.placeId', formData.place.placeId);

        // Perform form submission using Axios POST request
        axios
            .post('https://localhost:7036/api/Restaurant', data, {
                headers: { 
                    Authorization: `Bearer ${localStorage.getItem('token')}` },
            })
            .then((response) => {
                console.log('Form data submitted successfully:', response.data);
                // Clear the form data and selectedImage
                showSnackbar('Form data submitted successfully!', 'success');
                setFormData(initialFormData);
            })
            .catch((error) => {
                console.error('Error submitting form data:', error);
                showSnackbar('Error submitting form data. Please try again.', 'error');
                // Handle error if needed
            });
    };

    return (
        <Box>
            <Box>
                <form onSubmit={handleSubmit}>
                    <Box sx={{ backgroundColor: '#F0F4F7', p: 3 }}>
                        <Box sx={{ padding: '3%', backgroundColor: 'white', borderRadius: '10px' }}>
                            <Box>
                                <Typography>Primary Details</Typography>
                            </Box>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        label="Name"
                                        name="restaurantName"
                                        value={formData.restaurantName}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="normal"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    {/* TextField for the file input */}
                                    <TextField
                                        label="Contact"
                                        name="restaurantContact"
                                        value={formData.restaurantContact}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="normal"
                                    />
                                    {/* Button to trigger the file input */}
                                    <label htmlFor="imageFile">Upload Image</label>

                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <input
                                        type="file"
                                        id="imageFile"
                                        name="imageFile"
                                        className="form-control-file"
                                        onChange={handleImageChange}
                                    />
                                </Grid>
                            </Grid>
                        </Box>

                        <Box sx={{ padding: '3%', backgroundColor: 'white', borderRadius: '10px', marginTop: '2%' }}>
                            <Box>
                                <Typography>Location Details</Typography>
                            </Box>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={3}>
                                    <TextField
                                        label="Location"
                                        name="restaurantLocation"
                                        value={formData.restaurantLocation}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="normal"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <TextField
                                        label="Pincode"
                                        name="restaurantPincode"
                                        value={formData.restaurantPincode}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="normal"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <TextField
                                        label="Sub Location"
                                        name="restaurantSubLocation"
                                        value={formData.restaurantSubLocation}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="normal"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <TextField
                                        label="Place ID"
                                        name="place.placeId"
                                        value={formData.place.placeId}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="normal"
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                        <Box sx={{ marginTop: '2%' }}>
                            <Button type="submit" variant="contained" color="primary">
                                Submit
                            </Button>
                        </Box>
                    </Box>
                </form>
            </Box>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
            <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity={snackbarSeverity}>
                {snackbarMessage}
            </MuiAlert>
        </Snackbar>
        </Box>
    );
}

export default AddRestaurant;
