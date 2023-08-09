using System.ComponentModel.DataAnnotations;

namespace TravelAgent.Models
{
    public class Place
    {
        [Key]
        public int placeId { get; set; }
        [Required(ErrorMessage = "Place name is required.")]
        [MaxLength(80, ErrorMessage = "Place name cannot exceed 100 characters.")]
        public string? placeName { get; set; }
        [Display(Name = "Place Image")]
        public string? placeImage { get; set; }
        [MaxLength(500, ErrorMessage = "Place description cannot exceed 500 characters.")]
        public string? placeDescription { get; set; }
        public string? latitude { get; set; }
        public string? longitude { get; set; }
        public string? route { get; set; }
        [Range(1, int.MaxValue, ErrorMessage = "Total days must be at least 1.")]
        public int? totalDays { get; set; }
        public string? spots { get; set; }
        [Range(0, int.MaxValue, ErrorMessage = "Day cost must be a non-negative number.")] 
        public int ?dayCost { get; set; }
        [Range(0, int.MaxValue, ErrorMessage = "Tour cost must be a non-negative number.")]
        public int ?tourCost { get; set; }
        [Range(0, int.MaxValue, ErrorMessage = "Max distance must be a non-negative number.")]
        public int ?maxDistance { get; set; }
        public Agent ?Agent { get; set; }
        public ICollection<Hotel>? Hotels { get; set; }
        public ICollection<Restaurant>? Restaurants { get; set; }
    }
}
