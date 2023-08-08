using System.ComponentModel.DataAnnotations;

namespace TourPortal.Models
{
    public class UserDetail
    {
        [Key]
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Password { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public ICollection<Feedback>? Feedbacks { get; set; }
        public ICollection<Booking>? Bookings { get; set; }
    }
}
