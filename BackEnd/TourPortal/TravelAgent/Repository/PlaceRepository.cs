using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.EntityFrameworkCore;
using TravelAgent.Data;
using TravelAgent.Interfaces;
using TravelAgent.Models;

namespace TravelAgent.Repository
{
    public class PlaceRepository : IPlace
    {
        private readonly AgentContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public PlaceRepository(AgentContext context, IWebHostEnvironment webHostEnvironment)
        {
            _context = context;
            _webHostEnvironment = webHostEnvironment;
        }

        public IEnumerable<Place> GetPlace()
        {
            return _context.Places.Include(x => x.Hotels).Include(x => x.Restaurants).Include(x => x.Agent).ToList();
        }

        public Place GetPlacesById(int id)
        {
            return _context.Places.Include(p => p.Agent) // Eager load the Agent relationship
        .FirstOrDefault(x => x.placeId == id);
        }

        public async Task<Place> PostPlace([FromForm] Place place, IFormFile imageFile)
        {
            if (imageFile == null || imageFile.Length == 0)
            {
                throw new ArgumentException("Invalid file");
            }

            var uploadsFolder = Path.Combine(_webHostEnvironment.WebRootPath, "uploads/place");
            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(imageFile.FileName);
            var filePath = Path.Combine(uploadsFolder, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(stream);
            }

            place.placeImage = fileName;
            var p = _context.TravelAgents.Find(place.Agent.travelAgentId);
            place.Agent = p;
            _context.Places.Add(place);
            _context.SaveChanges();

            return place;
        }

        public async Task<Place> PutPlace(int id, [FromForm] Place place, IFormFile imageFile)
        {
            var existingPlace = await _context.Places.FindAsync(id);

            if (existingPlace == null)
            {
                return null;
            }

            if (imageFile != null && imageFile.Length > 0)
            {
                var uploadsFolder = Path.Combine(_webHostEnvironment.WebRootPath, "uploads/place");

                if (!string.IsNullOrEmpty(existingPlace.placeImage))
                {
                    var existingFilePath = Path.Combine(uploadsFolder, existingPlace.placeImage);
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

                place.placeImage = fileName;
            }
            else
            {
                place.placeImage = existingPlace.placeImage;
            }

            existingPlace.placeName = place.placeName;
            existingPlace.placeDescription = place.placeDescription;
            existingPlace.latitude = place.latitude;
            existingPlace.longitude = place.longitude;
            existingPlace.dayCost = place.dayCost;
            existingPlace.tourCost = place.tourCost;
            existingPlace.maxDistance = place.maxDistance;
            existingPlace.route = place.route;
            existingPlace.totalDays = place.totalDays;
            existingPlace.spots = place.spots;
            existingPlace.placeImage = place.placeImage;

            var p = _context.TravelAgents.Find(place.Agent.travelAgentId);
            existingPlace.Agent = p; // <--- Set the Agent of existingPlace
            await _context.SaveChangesAsync();

            return existingPlace;

        }

            public Place DeletePlace(int id)
        {
            var place = _context.Places.Find(id);
            if (place == null)
            {
                return null;
            }

            _context.Places.Remove(place);
            _context.SaveChanges();
            return place;
        }

    }
}