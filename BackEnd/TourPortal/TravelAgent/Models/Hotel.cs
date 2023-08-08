using Microsoft.CodeAnalysis;
using System.ComponentModel.DataAnnotations;

namespace TravelAgent.Models
{
    public class Hotel
    {
        [Key]
        public int hotelId { get; set; }
        public string? hotelName { get; set; }

        public string? hotelLocation { get; set; }
        public string? hotelSubLocation { get; set; }
        public string? hotelPincode { get; set; }

        public string? hotelImage { get; set; }
        public string? hotelContact { get; set; }

        public Place? Place { get; set; }
    }
}
