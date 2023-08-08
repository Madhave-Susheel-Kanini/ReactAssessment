using System.ComponentModel.DataAnnotations;

namespace TravelAgent.Models
{
    public class Agent
    {
        [Key]
        public int travelAgentId { get; set; }
        public string? travelAgentName { get; set; }
        public string? travelAgentPassword { get; set; }
        public string? travelAgentEmail { get; set; }
        public string? travelAgentPhone { get; set; }
        public string? travelAgentLocation { get; set; }
        public string? travelAgentGst { get; set; }
        public string? travelAgentPan { get; set; }

        public string? travelAgentStatus { get; set; }

        public ICollection<Agent> ?Agents { get; set;}

    }
}
