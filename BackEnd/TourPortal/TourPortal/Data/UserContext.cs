using Microsoft.EntityFrameworkCore;
using TourPortal.Models;

namespace TourPortal.Data
{
    public class UserContext : DbContext
    {
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<Feedback> Feedbacks { get; set; }

        public DbSet<UserDetail> UserDetails { get; set; }
        public DbSet<Gallery> Galleries{ get; set; }
        public DbSet<Admin> Admins{ get; set; }
        public UserContext(DbContextOptions<UserContext> options) : base(options)
        {
        }
    }
}
