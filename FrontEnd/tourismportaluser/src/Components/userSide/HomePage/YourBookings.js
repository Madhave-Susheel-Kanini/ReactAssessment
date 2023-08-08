import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Grid, Typography } from '@mui/material';

function YourBookings() {
  const [destinations, setDestinations] = useState([]);
  const [userId, setUserId] = useState(0);

  useEffect(() => {
    fetchData();
    const userid = localStorage.getItem("UserId");
    setUserId(parseInt(userid));
  }, []);

  const fetchData = async () => {
    try {
      const [response, userid] = await Promise.all([
        axios.get('https://localhost:7029/api/Bookings'),
        localStorage.getItem('UserId')
      ]);

      const { data: places } = response;
      const placewithid = places.filter(destination => destination.userDetail.id === parseInt(userid));
      console.log(`Total hotels with place.placeId === ${userid}: ${placewithid.length}`);
      setDestinations(placewithid);
      console.log(placewithid)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <section className="section popular" style={{height: '89vh'}}>
    <div className="container">
    {destinations && destinations.length > 0 ? (
        <Grid container>
          {destinations.map((booking) => (
            <Grid item xs={12} sm={6} md={3} key={booking.bookingId} sx={{
              border: '1px solid black',
              borderRadius: '15px',
              padding: '3%',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              backgroundColor: '#fff',
              transition: 'box-shadow 0.3s ease-in-out',
              '&:hover': {
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
              },
              marginLeft: '10px',
              marginTop: '10px'
            }}>
              <div className="center-div">
                <h2>Booking ID: {booking.bookingId}</h2>
                <p>Starting Point: {booking.startingPoint}</p>
                <p>Ending Point: {booking.endingPoint}</p>
                <p>Hotel: {booking.hotel}</p>
                <p>Head Count: {booking.headCount}</p>
                <p>Days Count: {booking.daysCount}</p>
                <p>Start Date: {booking.startDate}</p>
                <p>End Date: {booking.endDate}</p>
                <p>Start Time: {booking.startTime}</p>
                <p>End Time: {booking.endTime}</p>
                <p>Billing Mail: {booking.billingMail}</p>
                <p>Billing Address: {booking.billingAddress}</p>
                <p>User Mail: {booking.userMail}</p>
              </div>
              <br/>
              <Button href={`/feedback/${booking.bookingId}`}>Add Feedback</Button>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h5">Loading...</Typography>
      )}
      <br /><br /><br />
    </div>
  </section>
  );
}

export default YourBookings;
