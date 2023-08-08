using System.ComponentModel.DataAnnotations;

namespace TravelAgent.Models
{
    public class Place
    {
        [Key]
        public int placeId { get; set; }
        public string? placeName { get; set; }
        public string? placeImage { get; set; }
        public string? placeDescription { get; set; }
        public string? latitude { get; set; }
        public string? longitude { get; set; }
        public string? route { get; set; }
        public int? totalDays { get; set; }
        public string? spots { get; set; }
        public int ?dayCost { get; set; }
        public int ?tourCost { get; set; }
        public int ?maxDistance { get; set; }
        public Agent ?Agent { get; set; }
        public ICollection<Hotel>? Hotels { get; set; }
        public ICollection<Restaurant>? Restaurants { get; set; }
    }
}
