import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Grid, Typography } from '@mui/material';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const AddHotel = () => {

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
        hotelName: '',
        hotelLocation: '',
        hotelSubLocation: '',
        hotelPincode: '',
        imageFile: null, // Initialize hotelImage with null
        hotelContact: '',
        place: {
            placeId: 0,
        },
    };

    const fileInputRef = useRef(null);

    useEffect(() => {
        fileInputRef.current = document.createElement('input');
        fileInputRef.current.type = 'file';
        fileInputRef.current.style.display = 'none';
        fileInputRef.current.addEventListener('change', handleImageChange);
    }, []);

    const [formData, setFormData] = useState(initialFormData);
    const [selectedImage, setSelectedImage] = useState(null); // Initialize selectedImage with null

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'place.placeId') {
            setFormData((prevData) => ({
                ...prevData,
                place: {
                    ...prevData.place,
                    placeId: value, // Correct the property name here
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
        setSelectedImage(file);
        console.log(file); // Add this line to check the selected file in the console
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);

        const data = new FormData();
        data.append('hotelName', formData.hotelName);
        data.append('hotelLocation', formData.hotelLocation);
        data.append('hotelSubLocation', formData.hotelSubLocation);
        data.append('hotelPincode', formData.hotelPincode);
        data.append('hotelContact', formData.hotelContact);
        data.append('place.placeId', formData.place.placeId);
        if (selectedImage) {
            data.append('imageFile', selectedImage); // Use 'hotelImage' as the key
        }

        if (!formData.hotelName || !formData.hotelLocation || !formData.hotelSubLocation || !formData.hotelPincode || !formData.hotelContact || !formData.place.placeId || !selectedImage) {
            showSnackbar('Please fill all the required fields and upload an image.', 'error');
            return;
        }

        // Perform form submission using Axios POST request
        axios
            .post('https://localhost:7036/api/Hotels', data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Set the correct token
                    'Content-Type': 'multipart/form-data'
                },
            })
            .then((response) => {
                console.log('Form data submitted successfully:', response.data);
                // Clear the form data and selectedImage
                showSnackbar('Form data submitted successfully!', 'success');
                setFormData(initialFormData);
                setSelectedImage(null);
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
                                <Typography>Hotel Details</Typography>
                            </Box>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={3}>
                                    <TextField
                                        label="Hotel Name"
                                        name="hotelName"
                                        value={formData.hotelName}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="normal"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <TextField
                                        label="Hotel Location"
                                        name="hotelLocation"
                                        value={formData.hotelLocation}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="normal"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <TextField
                                        label="Hotel Sub-Location"
                                        name="hotelSubLocation"
                                        value={formData.hotelSubLocation}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="normal"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    {/* TextField for the file input */}
                                    <TextField
                                        label="Hotel Image"
                                        name="hotelImage"
                                        type="file"
                                        onChange={handleImageChange}
                                        fullWidth
                                        margin="normal"
                                        InputLabelProps={{ shrink: true }}
                                    />
                                    {/* Button to trigger the file input */}
                                    <Button
                                        onClick={() => fileInputRef.current.click()}
                                        variant="contained"
                                        color="primary"
                                    >
                                        Upload Image
                                    </Button>
                                    {/* Display the selected image name */}
                                    {formData.hotelImage && <span>{formData.hotelImage.name}</span>}
                                </Grid>
                            </Grid>
                        </Box>

                        <Box sx={{ padding: '3%', backgroundColor: 'white', borderRadius: '10px', marginTop: '2%' }}>
                            <Box>
                                <Typography>Contact Details</Typography>
                            </Box>
                            <Grid container spacing={2}>

                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        label="Pincode"
                                        name="hotelPincode"
                                        value={formData.hotelPincode}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="normal"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        label="Contact Number"
                                        name="hotelContact"
                                        value={formData.hotelContact}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="normal"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
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
};

export default AddHotel;
