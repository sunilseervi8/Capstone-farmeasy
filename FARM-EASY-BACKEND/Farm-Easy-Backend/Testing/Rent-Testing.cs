using Microsoft.EntityFrameworkCore;
using RentService.DataAccess;
using RentService.Model;
using RentService.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Testing
{
    [TestFixture]
    public class Rent_Testing
    {
        private RentalRepository _repository;
        private RentalDBContext _context;

        [SetUp]
        public void SetUp()
        {
            // Setup in-memory database
            var options = new DbContextOptionsBuilder<RentalDBContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString()) // Unique DB for each test
                .Options;

            _context = new RentalDBContext(options);
            _repository = new RentalRepository(_context);

            // Seed data
            _context.Rentals.AddRange(new List<Rental>
            {
                new Rental
                {
                    RentalId = "rental1",
                    UserId = "user1",
                    RentalTitle = "Rental One",
                    RentalDescription = "Description One",
                    RentalPrice = 100,
                    PickUpLocation = "Location One",
                    Image = "URL",
                    RentalNumberPlate = "Plate123"
                },
                new Rental
                {
                    RentalId = "rental2",
                    UserId = "user2",
                    RentalTitle = "Rental Two",
                    RentalDescription = "Description Two",
                    RentalPrice = 200,
                    PickUpLocation = "Location Two",
                    Image = "URL",
                    RentalNumberPlate = "Plate456"
                },
                new Rental
                {
                    RentalId = "rental3",
                    UserId = "user1",
                    RentalTitle = "Rental Three",
                    RentalDescription = "Description Three",
                    RentalPrice = 300,
                    PickUpLocation = "Location Three",
                    Image = "URL",
                    RentalNumberPlate = "Plate789"
                }
            });
            _context.SaveChanges(); // Make sure data is saved
        }

        [TearDown]
        public void TearDown()
        {
            // Cleanup
            _context.Database.EnsureDeleted();
            _context.Dispose();
        }

        [Test]
        public async Task GetRentalByIdAsync_ShouldReturnRental_WhenRentalExists()
        {
            // Act
            var result = await _repository.GetRentalByIdAsync("rental1");

            // Debugging
            Console.WriteLine("GetRentalByIdAsync result: " + (result == null ? "null" : result.RentalTitle));

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual("Rental One", result.RentalTitle);
            Assert.AreEqual("user1", result.UserId);
        }

        [Test]
        public async Task GetRentalByIdAsync_ShouldReturnNull_WhenRentalDoesNotExist()
        {
            // Act
            var result = await _repository.GetRentalByIdAsync("invalidId");

            // Debugging
            Console.WriteLine("GetRentalByIdAsync with invalid ID result: " + (result == null ? "null" : result.RentalTitle));

            // Assert
            Assert.IsNull(result);
        }

        [Test]
        public async Task GetRentalsByUserIdAsync_ShouldReturnRentalsForUser_WhenUserHasRentals()
        {
            // Act
            var result = await _repository.GetRentalsByUserIdAsync("user1");

            // Debugging
            Console.WriteLine("GetRentalsByUserIdAsync result count: " + result.Count());
            foreach (var rental in result)
            {
                Console.WriteLine($"Rental: {rental.RentalTitle}, UserId: {rental.UserId}");
            }

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(2, result.Count());
            Assert.IsTrue(result.All(r => r.UserId == "user1"));
        }

        [Test]
        public async Task GetRentalsByUserIdAsync_ShouldReturnEmptyList_WhenUserHasNoRentals()
        {
            // Act
            var result = await _repository.GetRentalsByUserIdAsync("nonExistingUser");

            // Debugging
            Console.WriteLine("GetRentalsByUserIdAsync with non-existing user result count: " + result.Count());

            // Assert
            Assert.IsNotNull(result);
            Assert.IsEmpty(result);
        }

        [Test]
        public async Task GetAllRentalsAsync_ShouldReturnAllRentals()
        {
            // Act
            var result = await _repository.GetAllRentalsAsync();

            // Debugging
            Console.WriteLine("GetAllRentalsAsync result count: " + result.Count());
            foreach (var rental in result)
            {
                Console.WriteLine($"Rental: {rental.RentalTitle}, UserId: {rental.UserId}");
            }

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(3, result.Count());
        }
    }
}
