import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Dialog, DialogContent, Grid, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Feedback() {
    const [feedback, setFeedbacks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchAllFeedbacks();
    }, [navigate]);

    const fetchAllFeedbacks = async () => {
        try {
            const response = await fetch('https://localhost:7029/api/Feedbacks');
            const responseBody = await response.json(); // Parsing the JSON response

            if (response.ok) {
                // Set the rooms using the data in the response body
                setFeedbacks(responseBody); // Assuming setRooms is a state update function
            } else {
                const errorMessage = responseBody.errorMessage;
                alert('Error: ' + errorMessage); // Display the errorMessage value in the alert
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
  
    
  
  return (
    <Box sx={{ backgroundColor: '#F0F4F7', height: '97vh', p: 2 }}>
            <Box sx={{ padding: '3%', backgroundColor: 'white', borderRadius: '10px' }}>
          
                <Grid container spacing={'1%'}>
                    {feedback.map((Feedbacks) => (
                        <Grid item xs={12} sm={6} md={3} key={Feedbacks.feedbackId}>
                            <Card sx={{ marginRight: '2%', marginBottom: '2%' }}>
                                <CardActionArea>
                                    <CardContent>
                                        <Typography variant="body2" color="text.secondary">
                                            <span
                                                style={{
                                                    backgroundColor: 'rgba(81, 98, 246, 0.14)',
                                                    float: 'right',
                                                    orderRadius: '3px',
                                                    paddingLeft: '8px',
                                                    paddingRight: '8px',
                                                    padding: '2px',
                                                    color: 'blue',
                                                    borderRadius: '5px'
                                                }}
                                            >
                                                {Feedbacks.createdAt}
                                            </span>
                                        </Typography>
                                        <Typography gutterBottom sx={{ fontWeight: '600' }} component="div">
                                            Feedback: {Feedbacks.feedbackId}
                                        </Typography>
                                        <Typography gutterBottom sx={{ fontWeight: '600' }} component="div">
                                            Feedback: {Feedbacks.feedback}
                                        </Typography>
                                        <Typography gutterBottom sx={{ fontWeight: '600' }} component="div">
                                            Booking ID: {Feedbacks?.booking?.bookingId}
                                        </Typography>
                                        <Typography gutterBottom sx={{ fontWeight: '600' }} component="div">
                                             User Id: {Feedbacks?.user?.id}  
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
  )
}

export default Feedback