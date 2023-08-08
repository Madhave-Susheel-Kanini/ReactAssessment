using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TravelAgent.Data;
using TravelAgent.Interfaces;
using TravelAgent.Models;

namespace TravelAgent.Repository
{
    public class RestaurantRepository:IRestaurant
    {
        private readonly AgentContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public RestaurantRepository(AgentContext context, IWebHostEnvironment webHostEnvironment)
        {
            _context = context;
            _webHostEnvironment = webHostEnvironment;
        }
        public IEnumerable<Restaurant> GetRestaurant()
        {
            return _context.Restaurants.Include(x => x.Place).ToList();
        }

        public Restaurant GetRestaurantsById(int id)
        {
            return _context.Restaurants.FirstOrDefault(x => x.RestaurantId == id);
        }
        public async Task<Restaurant> PostRestaurant([FromForm] Restaurant restaurant, IFormFile imageFile)
        {
            if (imageFile == null || imageFile.Length == 0)
            {
                throw new ArgumentException("Invalid file");
            }

            var uploadsFolder = Path.Combine(_webHostEnvironment.WebRootPath, "uploads/restaurant");
            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(imageFile.FileName);
            var filePath = Path.Combine(uploadsFolder, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(stream);
            }

            restaurant.restaurantImage = fileName;
            var p = _context.Places.Find(restaurant.Place.placeId);
            restaurant.Place = p;

            _context.Restaurants.Add(restaurant);
            _context.SaveChanges();

            return restaurant;
        }
        public async Task<Restaurant> PutRestaurant(int id, [FromForm] Restaurant restaurant, IFormFile imageFile)
        {
            var existingRestaurant = await _context.Restaurants.FindAsync(id);

            if (existingRestaurant == null)
            {
                return null;
            }

            if (imageFile != null && imageFile.Length > 0)
            {
                var uploadsFolder = Path.Combine(_webHostEnvironment.WebRootPath, "uploads/restaurant");

                if (!string.IsNullOrEmpty(existingRestaurant.restaurantImage))
                {
                    var existingFilePath = Path.Combine(uploadsFolder, existingRestaurant.restaurantImage);
                    if (File.Exists(existingFilePath))
                    {
                        File.Delete(existingFilePath);
                    }
                }

                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(imageFile.FileName);
                var filePath = Path.Combine(uploadsFolder, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await imageFile.CopyToAsync(stream);
                }

                restaurant.restaurantImage = fileName;
            }
            else
            {
                restaurant.restaurantImage = existingRestaurant.restaurantImage;
            }

            existingRestaurant.restaurantName = restaurant.restaurantName;
            existingRestaurant.restaurantLocation = restaurant.restaurantLocation;
            existingRestaurant.restaurantSubLocation = restaurant.restaurantSubLocation;
            existingRestaurant.restaurantPincode = restaurant.restaurantPincode;
            existingRestaurant.restaurantContact = restaurant.restaurantContact;
            existingRestaurant.restaurantImage = restaurant.restaurantImage;

            var p = _context.Places.Find(restaurant.Place.placeId);
            existingRestaurant.Place = p;
            await _context.SaveChangesAsync();

            return existingRestaurant;
        }

        public Restaurant DeleteRestaurant(int id)
        {
            var restaurant = _context.Restaurants.Find(id);
            if (restaurant == null)
            {
                return null;
            }

            _context.Restaurants.Remove(restaurant);
            _context.SaveChanges();
            return restaurant;
        }
    }
}
