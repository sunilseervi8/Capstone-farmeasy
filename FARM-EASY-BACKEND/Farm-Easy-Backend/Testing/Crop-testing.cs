using System.Collections.Generic;
using System.Linq;
using LMS_User_Service.Data;
using LMS_User_Service.Model;
using LMS_User_Service.Repository;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Moq;
using NUnit.Framework;

namespace Testing
{
    [TestFixture]
    internal class CropTesting
    {
        private CropDBContext _context;
        private CropRepository _repository;
        private Mock<IEmailSender> _emailSenderMock;
        private Mock<IConfiguration> _configurationMock;

        [SetUp]
        public void SetUp()
        {
            // Setup unique in-memory database options for each test
            var options = new DbContextOptionsBuilder<CropDBContext>()
                .UseInMemoryDatabase(databaseName: $"CropTestDB_{System.Guid.NewGuid()}")
                .Options;

            // Initialize the in-memory context
            _context = new CropDBContext(options);

            // Setup mock objects for dependencies
            _emailSenderMock = new Mock<IEmailSender>();
            _configurationMock = new Mock<IConfiguration>();

            // Initialize repository with mock dependencies and in-memory context
            _repository = new CropRepository(_configurationMock.Object, _emailSenderMock.Object, _context);
        }

        [TearDown]
        public void TearDown()
        {
            _context.Database.EnsureDeleted();
            _context.Dispose();
        }

        [Test]
        public void GetAllCrops_ReturnsAllCrops()
        {
            // Arrange
            var crops = new List<Crop>
            {
                new Crop { Id = 1, Name = "Wheat", Category = "Grain", Quantity = 100, Unit = "kg", Price = 20, ImageUrl = "url1" },
                new Crop { Id = 2, Name = "Rice", Category = "Grain", Quantity = 200, Unit = "kg", Price = 30, ImageUrl = "url2" }
            };
            _context.Crops.AddRange(crops);
            _context.SaveChanges();

            // Act
            var result = _repository.GetAllCrops().ToList();

            // Assert
            Assert.AreEqual(2, result.Count);
            Assert.AreEqual("Wheat", result[0].Name);
            Assert.AreEqual("Rice", result[1].Name);
        }

        [Test]
        public void GetCropById_ExistingId_ReturnsCorrectCrop()
        {
            // Arrange
            var crop = new Crop { Id = 1, Name = "Wheat", Category = "Grain", Quantity = 100, Unit = "kg", Price = 20, ImageUrl = "url1" };
            _context.Crops.Add(crop);
            _context.SaveChanges();

            // Act
            var result = _repository.GetCropById(1);

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(1, result.Id);
            Assert.AreEqual("Wheat", result.Name);
        }

        [Test]
        public void GetCropById_NonExistingId_ReturnsNull()
        {
            // Act
            var result = _repository.GetCropById(999);

            // Assert
            Assert.IsNull(result);
        }

        [Test]
        public void GetCropsByCategory_ExistingCategory_ReturnsCorrectCrops()
        {
            // Arrange
            var crops = new List<Crop>
            {
                new Crop { Id = 1, Name = "Wheat", Category = "Grain", Quantity = 100, Unit = "kg", Price = 20, ImageUrl = "url1" },
                new Crop { Id = 2, Name = "Rice", Category = "Grain", Quantity = 200, Unit = "kg", Price = 30, ImageUrl = "url2" },
                new Crop { Id = 3, Name = "Apple", Category = "Fruit", Quantity = 150, Unit = "kg", Price = 50, ImageUrl = "url3" }
            };
            _context.Crops.AddRange(crops);
            _context.SaveChanges();

            // Act
            var result = _repository.GetCropsByCategory("Grain").ToList();

            // Assert
            Assert.AreEqual(2, result.Count);
            Assert.IsTrue(result.All(c => c.Category == "Grain"));
        }

        [Test]
        public void GetCropsByCategory_NonExistingCategory_ReturnsEmptyList()
        {
            // Act
            var result = _repository.GetCropsByCategory("Vegetable").ToList();

            // Assert
            Assert.IsEmpty(result);
        }
    }
}
