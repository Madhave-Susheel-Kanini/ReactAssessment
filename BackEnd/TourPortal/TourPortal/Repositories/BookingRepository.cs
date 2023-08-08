using Microsoft.EntityFrameworkCore;
using TourPortal.Data;
using TourPortal.Interfaces;
using TourPortal.Models;

namespace TourPortal.Repositories
{
    public class BookingRepository:IBooking
    {
        private readonly UserContext _Context;
        public BookingRepository(UserContext con)
        {
            _Context = con;
        }
        public IEnumerable<Booking> GetBooking()
        {
            return _Context.Bookings.Include(x => x.UserDetail).Include(x=>x.Feedbacks).ToList();
        }
        public Booking GetBookingsById(int id)
        {
            return _Context.Bookings.FirstOrDefault(x => x.BookingId == id);
        }
        public Booking PostBooking(Booking booking)
        {
            var p = _Context.UserDetails.Find(booking.UserDetail.Id); 
            booking.UserDetail = p;

            _Context.Add(booking);
            _Context.SaveChanges();
            return booking;
        }
        public Booking PutBooking(int id, Booking booking)
        {
            var p = _Context.UserDetails.Find(booking.UserDetail.Id); 
            booking.UserDetail = p;
            _Context.Entry(booking).State = EntityState.Modified;
            _Context.SaveChanges();
            return booking;
        }

        public Booking DeleteBooking(int id)
        {

            var booking = _Context.Bookings.Find(id);


            _Context.Bookings.Remove(booking);
            _Context.SaveChanges();

            return booking;
        }
    }
}
