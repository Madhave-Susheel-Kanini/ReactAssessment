using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using TravelAgent.Controllers;
using TravelAgent.Interfaces;
using TravelAgent.Models;

namespace TravelAgentTest
{
    public class HotelTest
    {

        [Fact]
        public void Get_ReturnsListOfHotels()
        {
            // Arrange
            var mockRepository = new Mock<IHotel>();
            var expectedHotels = new List<Hotel>
            {
            new Hotel { hotelId = 1, hotelName = "Maldives Inn", hotelLocation = "Maldives", hotelSubLocation = "High Cross", hotelPincode = "109821", hotelImage = "22c99dc5-ef05-45cf-b768-da54e4b16e5e.jpg", hotelContact = "9898989898" },
                new Hotel { hotelId = 2, hotelName = "Holiday Inn", hotelLocation = "Maldives", hotelSubLocation = "High Mal", hotelPincode = "109821", hotelImage = "23c99dc5-ef05-45cf-b768-da54e4b16e5e.jpg", hotelContact = "9898989898" }
            };
            mockRepository.Setup(repo => repo.GetHotel()).Returns(expectedHotels);
            var controller = new HotelsController(mockRepository.Object);

            // Act
            var result = controller.GetHotel();

            // Assert
            var actionResult = Assert.IsType<ActionResult<IEnumerable<Hotel>>>(result);
            var okResult = Assert.IsType<OkObjectResult>(actionResult.Result);
            var actualHotels = Assert.IsAssignableFrom<IEnumerable<Hotel>>(okResult.Value);
            Assert.Equal(expectedHotels, actualHotels);
        }
        [Fact]

        public void GetById_ExistingId_ReturnsHotel()
        {
            // Arrange
            var mockRepository = new Mock<IHotel>();
            var expectedHotels = new Hotel { hotelId = 1, hotelName = "Novotel", hotelLocation = "Chennai", hotelSubLocation = "Shollinganallur", hotelPincode = "600119", hotelImage = "22c99dc5-ef05-45cf-b768-da54e4b16e5e.jpg", hotelContact = "9898989898" };
            mockRepository.Setup(repo => repo.GetHotelsById(1)).Returns(expectedHotels);
            var controller = new HotelsController(mockRepository.Object);

            // Act
            var result = controller.GetById(1);

            // Assert
            var actionResult = Assert.IsType<ActionResult<Hotel>>(result);
            var okResult = Assert.IsType<OkObjectResult>(actionResult.Result);
            var actualHotels = Assert.IsType<Hotel>(okResult.Value);
            Assert.Equal(expectedHotels, actualHotels);
        }
        [Fact]
        public async Task PostHotel_ValidHotel_ReturnsCreatedHotel()
        {
            // Arrange
            var mockRepository = new Mock<IHotel>();
            var expectedHotel = new Hotel { hotelId = 1, hotelName = "Navi", hotelLocation = "Bhutan", hotelSubLocation = "Rajur", hotelPincode = "801922", hotelImage = "22c99dc5-ef05-45cf-b768-da54e4b16e5e.jpg", hotelContact = "9898989898" };
            var mockFormFile = new Mock<IFormFile>();
            mockRepository.Setup(repo => repo.PostHotel(expectedHotel, mockFormFile.Object)).ReturnsAsync(expectedHotel);
            var controller = new HotelsController(mockRepository.Object);

            // Act
            var result = await controller.Post(expectedHotel, mockFormFile.Object);

            // Assert
            var actionResult = Assert.IsType<ActionResult<Hotel>>(result);
            var okResult = Assert.IsType<OkObjectResult>(actionResult.Result);
            var actualCreatedHotel = Assert.IsType<Hotel>(okResult.Value);
            Assert.Equal(expectedHotel, actualCreatedHotel);
        }
        [Fact]
        public async Task PutHotel_ValidHotel_ReturnsUpdatedHotel()
        {
            // Arrange
            var mockRepository = new Mock<IHotel>();
            var existingHotel = new Hotel { hotelId = 1, hotelName = "Ibis", hotelLocation = "Chennai", hotelSubLocation = "Shollinganallur", hotelPincode = "600119", hotelImage = "22c99dc5-ef05-45cf-b768-da54e4b16e5e.jpg", hotelContact = "9898989898" };
            var updatedHotel = new Hotel { hotelId = 1, hotelName = "Radison Blu", hotelLocation = "Coimbatore", hotelSubLocation = "Gandhipuram", hotelPincode = "641012", hotelImage = "22c99dc5-ef05-45cf-b768-da54e4b16e5e.jpg", hotelContact = "9898989898" };
            var mockFormFile = new Mock<IFormFile>();
            mockRepository.Setup(repo => repo.PutHotel(existingHotel.hotelId, updatedHotel, mockFormFile.Object)).ReturnsAsync(existingHotel);
            var controller = new HotelsController(mockRepository.Object);

            // Act
            var result = await controller.Put(existingHotel.hotelId, updatedHotel, mockFormFile.Object);

            // Assert
            var actionResult = Assert.IsType<ActionResult<Hotel>>(result);
            var okResult = Assert.IsType<OkObjectResult>(actionResult.Result);
            var actualUpdatedHotel = Assert.IsType<Hotel>(okResult.Value);
            Assert.Equal(existingHotel, actualUpdatedHotel);
        }

        [Fact]
        public void DeleteHotel_ExistingId_ReturnsDeletedHotel()
        {
            // Arrange
            var mockRepository = new Mock<IHotel>();
            var hotelToDelete = new Hotel { hotelId = 1, hotelName = "Ibis", hotelLocation = "Chennai", hotelSubLocation = "Shollinganallur", hotelPincode = "600119", hotelImage = "22c99dc5-ef05-45cf-b768-da54e4b16e5e.jpg", hotelContact = "6383145933" };
            mockRepository.Setup(repo => repo.DeleteHotel(1)).Returns(hotelToDelete);
            var controller = new HotelsController(mockRepository.Object);

            // Act
            var result = controller.Delete(1);

            // Assert
            var actionResult = Assert.IsType<ActionResult<Hotel>>(result);
            var okResult = Assert.IsType<OkObjectResult>(actionResult.Result);
            var actualDeletedHotel = Assert.IsType<Hotel>(okResult.Value);
            Assert.Equal(hotelToDelete, actualDeletedHotel);
        }

    }
}
