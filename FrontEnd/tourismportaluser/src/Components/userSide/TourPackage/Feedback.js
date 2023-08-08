import React, { useState, useEffect } from 'react';
import { Button, TextField, Box, Container } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const FeedBack = () => {
    const [idofuser, setUserId] = useState(0);
    const { id } = useParams();

    const [formData, setFormData] = useState({
        feedback: '',
        createdAt: '',
        booking: {
            bookingId: id
        },
        user: {
            id: idofuser
        }
    });

    useEffect(() => {
        const userodaId = localStorage.getItem("UserId")
        setUserId(userodaId)
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Check if the field is nested (booking or user)
        if (name.includes('.')) {
            const [nestedField, nestedName] = name.split('.');
            setFormData((prevData) => ({
                ...prevData,
                [nestedField]: {
                    ...prevData[nestedField],
                    [nestedName]: value,
                },
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Perform form submission using Axios POST request
        axios
            .post('https://localhost:7029/api/Feedbacks', formData, {
                headers: { 'Content-Type': 'application/json' },
            })
            .then((response) => {
                console.log('Form data submitted successfully:', response.data);
                // Clear the form data and selectedImage
                setFormData({
                    feedback: '',
                    createdAt: '',
                    booking: {
                        bookingId: id
                    },
                    user: {
                        id: idofuser
                    }
                });
            })
            .catch((error) => {
                console.error('Error submitting form data:', error);
                // Handle error if needed
            });
    };

    return (
        <>
            <Box
                sx={{
                    backgroundColor: '#F0F4F7',
                    height: '97vh',
                    p: 2,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Box sx={{ padding: '3%', backgroundColor: 'white', borderRadius: '10px', width: '80%' }}>
                    <h2>Feedback Form</h2>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="User"
                            variant="outlined"
                            fullWidth
                            name="user.userId"
                            value={idofuser}
                            onChange={handleChange}
                            margin="normal"
                            disabled
                            required
                        />
                        <TextField
                            label="Booking"
                            variant="outlined"
                            name="booking.bookingId"
                            fullWidth
                            disabled
                            value={id}
                            onChange={handleChange}
                            margin="normal"
                            required
                        />
                        <TextField
                            label="Created At"
                            variant="outlined"
                            name="createdAt"
                            fullWidth
                            value={formData.createdAt}
                            onChange={handleChange}
                            margin="normal"
                            required
                        />
                        <TextField
                            label="Feedback"
                            variant="outlined"
                            fullWidth
                            name="feedback"
                            value={formData.feedback}
                            onChange={handleChange}
                            margin="normal"
                            multiline
                            rows={4}
                            required
                        />
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Submit Feedback
                        </Button>
                    </form>
                </Box>
            </Box>
        </>
    );
};

export default FeedBack;
