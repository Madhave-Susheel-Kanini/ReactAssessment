using Microsoft.CodeAnalysis;
using System.ComponentModel.DataAnnotations;

namespace TravelAgent.Models
{
    public class Hotel
    {
        [Key]
        public int hotelId { get; set; }
        [Required(ErrorMessage = "Hotel name is required.")]
        public string? hotelName { get; set; }
        [Required(ErrorMessage = "Hotel location is required.")]
        public string? hotelLocation { get; set; }
        [Display(Name = "Hotel Sublocation")]
        public string? hotelSubLocation { get; set; }
        [RegularExpression(@"^\d{6}$", ErrorMessage = "Invalid pincode format. It should be 6 digits.")]
        [Display(Name = "Hotel Pincode")]
        public string? hotelPincode { get; set; }
        [Display(Name = "Hotel Image URL")]
        public string? hotelImage { get; set; }
        [RegularExpression(@"^\d{10}$", ErrorMessage = "Invalid contact number format.")]
        [Display(Name = "Hotel Contact")]
        public string? hotelContact { get; set; }

        public Place? Place { get; set; }
    }
}
