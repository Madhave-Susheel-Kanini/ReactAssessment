using System.ComponentModel.DataAnnotations;

namespace Admin.Models
{
    public class Gallery
    {
        [Key]
        public int galleryId { get; set; }
        public string? galleryImage { get; set; }
    }
}
