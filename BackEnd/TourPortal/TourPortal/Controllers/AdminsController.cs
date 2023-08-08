using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TourPortal.Interfaces;
using TourPortal.Models;

namespace TourPortal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminsController : ControllerBase
    {
        private readonly IAdmin _adminRepository;

        public AdminsController(IAdmin adminRepository)
        {
            _adminRepository = adminRepository;
        }

        [HttpGet]
        public IActionResult GetAdmins()
        {
            var admins = _adminRepository.GetAdmin();
            return Ok(admins);
        }

        [HttpGet("{id}")]
        public IActionResult GetAdminById(int id)
        {
            var admin = _adminRepository.GetAdminsById(id);
            if (admin == null)
            {
                return NotFound();
            }
            return Ok(admin);
        }

        [HttpPost]
        public IActionResult CreateAdmin(Admin admin)
        {
            var newAdmin = _adminRepository.PostAdmins(admin);
            return CreatedAtAction(nameof(GetAdminById), new { id = newAdmin.Id }, newAdmin);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateAdmin(int id, Admin admin)
        {
            var updatedAdmin = _adminRepository.PutAdmin(id, admin);
            return Ok(updatedAdmin);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteAdmin(int id)
        {
            var existingAdmin = _adminRepository.GetAdminsById(id);
            if (existingAdmin == null)
            {
                return NotFound();
            }
            _adminRepository.DeleteAdmin(id);
            return NoContent();
        }
    }
}
