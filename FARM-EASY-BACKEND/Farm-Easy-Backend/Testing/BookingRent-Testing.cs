using Moq;
using NUnit.Framework; // NUnit namespace for testing
using Microsoft.EntityFrameworkCore; // EF Core namespace for DbContext
using RentService.DataAccess; // Your data context
using RentService.Model; // Your model
using RentService.Repository; // Your repository
using System;
using System.Collections.Generic;
using System.Linq; // Required for .Count() and LINQ operations
using System.Threading.Tasks; // Required for async/await

namespace Testing
{
    [TestFixture]
    public class BookingRent_Testing
    {
        private BookingRepository _repository;
        private RentalDBContext _context;

        [SetUp]
        public void SetUp()
        {
            var options = new DbContextOptionsBuilder<RentalDBContext>()
                .UseInMemoryDatabase(databaseName: "TestDatabase")
                .Options;

            _context = new RentalDBContext(options);
            _repository = new BookingRepository(_context);

            // Clear existing data (important for preventing cross-test contamination)
            _context.BookRentals.RemoveRange(_context.BookRentals);
            _context.SaveChanges();

            // Seed test data
            _context.BookRentals.AddRange(new List<BookRentals>
    {
        new BookRentals
        {
            BookingId = "booking1",
            RentalId = "rental1",
            RentFrom = new DateTime(2024, 11, 10),
            RentTill = new DateTime(2024, 11, 15)
        },
        new BookRentals
        {
            BookingId = "booking2",
            RentalId = "rental2",
            RentFrom = new DateTime(2024, 11, 16),
            RentTill = new DateTime(2024, 11, 20)
        }
    });
            _context.SaveChanges(); // Ensure data is persisted to in-memory database
        }
    

        [TearDown]
        public void TearDown()
        {
            _context.Database.EnsureDeleted();
            _context.Dispose();
        }

        [Test]
        public async Task GetAllBookingsAsync_ShouldReturnAllBookings()
        {
            // Act
            var result = await _repository.GetAllBookingsAsync();

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(2, result.Count());
        }

        [Test]
        public async Task GetBookingByIdAsync_ValidId_ShouldReturnBooking()
        {
            // Act
            var result = await _repository.GetBookingByIdAsync("booking1");

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual("rental1", result.RentalId);
            Assert.AreEqual(new DateTime(2024, 11, 10), result.RentFrom);
        }

        [Test]
        public async Task GetBookingByIdAsync_InvalidId_ShouldReturnNull()
        {
            // Act
            var result = await _repository.GetBookingByIdAsync("invalidId");

            // Assert
            Assert.IsNull(result);
        }

        [Test]
        public async Task GetBookedDatesByRentalId_ValidRentalId_ShouldReturnBookedDates()
        {
            // Act
            var result = await _repository.GetBookedDatesByRentalId("rental1");

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(6, result.Count); // Total 6 days from 10th to 15th (inclusive)
            Assert.Contains(new DateTime(2024, 11, 10), result);
            Assert.Contains(new DateTime(2024, 11, 15), result);
        }

        [Test]
        public async Task GetBookedDatesByRentalId_InvalidRentalId_ShouldReturnEmptyList()
        {
            // Act
            var result = await _repository.GetBookedDatesByRentalId("invalidRental");

            // Assert
            Assert.IsNotNull(result);
            Assert.IsEmpty(result);
        }

    }
}
