using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using TravelAgent.Interfaces;
using TravelAgent.Models;
using TravelAgent.Repository;

namespace TravelAgent.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RestaurantController : ControllerBase
    {
        private readonly IRestaurant _restaurantRepository;

        public RestaurantController(IRestaurant restaurantRepository)
        {
            _restaurantRepository = restaurantRepository;
        }

        // GET: api/Restaurant
        [HttpGet]
        public IEnumerable<Restaurant> Get()
        {
            return _restaurantRepository.GetRestaurant();
        }

        // GET: api/Restaurant/5
        [HttpGet("{id}")]
        public ActionResult<Restaurant> Get(int id)
        {
            var restaurant = _restaurantRepository.GetRestaurantsById(id);
            if (restaurant == null)
            {
                return NotFound();
            }
            return restaurant;
        }

        // POST: api/Restaurant
        [Authorize(Roles = "Agent")]
        [HttpPost]
        public async Task<ActionResult<Restaurant>> Post([FromForm] Restaurant restaurant, IFormFile imageFile)
        {
            try
            {
                var newRestaurant = await _restaurantRepository.PostRestaurant(restaurant, imageFile);
                return CreatedAtAction(nameof(Get), new { id = newRestaurant.RestaurantId }, newRestaurant);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error creating the restaurant.");
            }
        }

        // PUT: api/Restaurant/5
        [Authorize(Roles = "Agent")]
        [HttpPut("{id}")]
        public async Task<ActionResult<Restaurant>> Put(int id, [FromForm] Restaurant restaurant, IFormFile imageFile)
        {
            try
            {
                var updatedRestaurant = await _restaurantRepository.PutRestaurant(id, restaurant, imageFile);
                return Ok(updatedRestaurant);
            }
            catch (ArgumentException ex)
            {
                ModelState.AddModelError("", ex.Message);
                return BadRequest(ModelState);
            }
        }

        // DELETE: api/Restaurant/5
        [Authorize(Roles = "Agent")]
        [HttpDelete("{id}")]
        public ActionResult<Restaurant> Delete(int id)
        {
            var restaurant = _restaurantRepository.DeleteRestaurant(id);
            if (restaurant == null)
            {
                return NotFound();
            }
            return restaurant;
        }
    }
}