using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TourPortal.Interfaces;
using TourPortal.Models;

namespace TourPortal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingsController : ControllerBase
    {
        private readonly IBooking _bookingRepository;

        public BookingsController(IBooking bookingRepository)
        {
            _bookingRepository = bookingRepository;
        }

        // GET: api/Booking
        [HttpGet]
        public IEnumerable<Booking> Get()
        {
            return _bookingRepository.GetBooking();
        }

        // GET: api/Booking/5
        [HttpGet("{id}")]
        public ActionResult<Booking> GetById(int id)
        {
            var booking = _bookingRepository.GetBookingsById(id);

            if (booking == null)
            {
                return NotFound();
            }

            return booking;
        }

        // POST: api/Booking
        [HttpPost]
        public ActionResult<Booking> Post(Booking booking)
        {
            var newBooking = _bookingRepository.PostBooking(booking);
            return CreatedAtAction(nameof(GetById), new { id = newBooking.BookingId }, newBooking);
        }

        // PUT: api/Booking/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, Booking booking)
        {
            if (id != booking.BookingId)
            {
                return BadRequest();
            }

            var updatedBooking = _bookingRepository.PutBooking(id, booking);

            if (updatedBooking == null)
            {
                return NotFound();
            }

            return NoContent();
        }

        // DELETE: api/Booking/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var booking = _bookingRepository.DeleteBooking(id);

            if (booking == null)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
