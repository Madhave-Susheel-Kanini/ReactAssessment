﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using static TourPortal.Models.Gallery;
using TourPortal.Models;
using TourPortal.Data;
using Microsoft.EntityFrameworkCore;
using Azure.Storage.Blobs;

namespace TourPortal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GalleriesController : ControllerBase
    {
        private readonly UserContext _context;
        private readonly BlobOptions _blobOptions; // Add this field

        public GalleriesController(UserContext context, IOptions<BlobOptions> blobOptions)
        {
            _context = context;
            _blobOptions = blobOptions.Value; // Initialize the field with the BlobOptions value
        }
        [HttpGet]
        public async Task<IActionResult> GetGallerBlobs()
        {
            try
            {
                var gallery = await _context.Galleries.ToListAsync();
                return Ok(gallery);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error retrieving gallery: {ex.Message}");
            }
        }
        [HttpPost]
        public async Task<IActionResult> AddHotel([FromForm] GalleryCreateViewModel galleryViewModel)
        {
            try
            {
                if (galleryViewModel.GalImage == null || galleryViewModel.GalImage.Length == 0)
                {
                    return BadRequest("No hotel image file was provided.");
                }

                // Save the hotel details to the database
                Gallery galleryDetails = new Gallery
                {
                    galName = galleryViewModel.Gname,

                };

                // Assuming you have a DbContext instance named "dbContext" for your database
                _context.Galleries.Add(galleryDetails);
                await _context.SaveChangesAsync();

                // Retrieve the newly generated HotelId
                int newGalId = galleryDetails.galId;

                // Retrieve the connection string and container name
                string connectionString = _blobOptions.ConnectionString;
                string containerName = "place-container";

                // Create the BlobServiceClient
                BlobServiceClient blobServiceClient = new BlobServiceClient(connectionString);

                // Create the container if it does not exist
                BlobContainerClient containerClient = blobServiceClient.GetBlobContainerClient(containerName);
                await containerClient.CreateIfNotExistsAsync();

                // Generate a unique blob name based on the newHotelId and the uploaded image
                string blobName = $"{newGalId}_{Guid.NewGuid().ToString()}{Path.GetExtension(galleryViewModel.GalImage.FileName)}";

                // Get a reference to the blob
                BlobClient blobClient = containerClient.GetBlobClient(blobName);

                // Upload the hotel image to the blob
                using (var stream = galleryViewModel.GalImage.OpenReadStream())
                {
                    await blobClient.UploadAsync(stream, true);
                }

                // After uploading the image to Blob Storage, set the ImageUrl property of the hotel
                galleryDetails.galImage = blobClient.Uri.ToString();

                // Update the hotel record in the database to include the ImageUrl
                _context.Galleries.Update(galleryDetails);
                await _context.SaveChangesAsync();

                // Return the URL of the uploaded hotel image
                return Ok(galleryDetails.galImage);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error uploading hotel image: {ex.Message}");
            }
        }
    }
}
