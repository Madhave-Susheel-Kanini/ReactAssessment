using System.ComponentModel.DataAnnotations;

namespace TravelAgent.Models
{
    public class Restaurant
    {
        [Key]
        public int RestaurantId { get; set; }
        [Required(ErrorMessage = "Restaurant name is required.")]
        [MaxLength(30, ErrorMessage = "Restaurant name cannot exceed 100 characters.")]
        public string? restaurantName { get; set; }
        [Display(Name = "Restaurant Location")]
        public string? restaurantLocation { get; set; }
        [Display(Name = "Restaurant Sub-Location")]
        public string? restaurantSubLocation { get; set; }
        public string? restaurantPincode { get; set; }
        [Display(Name = "Restaurant Image")]
        public string? restaurantImage { get; set; }
        [RegularExpression(@"^\d{10}$", ErrorMessage = "Invalid contact number format.")]
        [Display(Name = "Restaurant Contact")]
        public string? restaurantContact { get; set; }
        public Place? Place { get; set; }
    }
}
