using System.ComponentModel.DataAnnotations;

namespace TravelAgent.Models
{
    public class Restaurant
    {
        [Key]
        public int RestaurantId { get; set; }
        public string? restaurantName { get; set; }

        public string? restaurantLocation { get; set; }
        public string? restaurantSubLocation { get; set; }
        public string? restaurantPincode { get; set; }
        public string? restaurantImage { get; set; }
        public string? restaurantContact { get; set; }
        public Place? Place { get; set; }
    }
}
