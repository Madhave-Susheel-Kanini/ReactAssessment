using Microsoft.EntityFrameworkCore;
using TravelAgent.Models;

namespace TravelAgent.Data
{
    public class AgentContext:DbContext
    {
        public DbSet<Hotel> Hotels { get; set; }
        public DbSet<Restaurant> Restaurants { get; set; }
        public DbSet<Place> Places { get; set; }
        public DbSet<Agent> TravelAgents { get; set; }
        public DbSet<Admin> Admins { get; set; }

        public AgentContext(DbContextOptions<AgentContext> options) : base(options)
        {
        }
    }
}
