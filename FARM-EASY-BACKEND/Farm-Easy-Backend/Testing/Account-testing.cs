using System.Collections.Generic;
using System.Threading.Tasks;
using Account_Service.Data;
using Account_Service.DTO;
using Account_Service.Models;
using Account_Service.Repository;
using AccountService.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Moq;
using NUnit.Framework;

namespace Testing
{
    [TestFixture]
    public class Tests
    {
        private Mock<UserManager<ApplicationUser>> _userManagerMock;
        private Mock<RoleManager<IdentityRole>> _roleManagerMock;
        private Mock<IConfiguration> _configurationMock;
        private Mock<IEmailSender> _emailSenderMock;
        private AccountDBContext _context;
        private AccountRepository _repository;

        [SetUp]
        public void SetUp()
        {
            // Set up an in-memory database for testing
            var options = new DbContextOptionsBuilder<AccountDBContext>()
                .UseInMemoryDatabase(databaseName: "AccountTestDB")
                .Options;

            _context = new AccountDBContext(options);

            // Mock dependencies
            var userStoreMock = new Mock<IUserStore<ApplicationUser>>();
            _userManagerMock = new Mock<UserManager<ApplicationUser>>(userStoreMock.Object, null, null, null, null, null, null, null, null);
            var roleStoreMock = new Mock<IRoleStore<IdentityRole>>();
            _roleManagerMock = new Mock<RoleManager<IdentityRole>>(roleStoreMock.Object, null, null, null, null);
            _configurationMock = new Mock<IConfiguration>();
            _emailSenderMock = new Mock<IEmailSender>();

            _repository = new AccountRepository(
                _userManagerMock.Object,
                null, // SignInManager is not needed for get methods
                _roleManagerMock.Object,
                _configurationMock.Object,
                _emailSenderMock.Object,
                _context
            );
        }

        [TearDown]
        public void TearDown()
        {
            _context.Database.EnsureDeleted();
            _context.Dispose();
        }

        [Test]
        public async Task GetAllSellers_ReturnsAllSellers()
        {
            // Arrange
            var sellers = new List<ApplicationUser>
            {
                new ApplicationUser { Id = "1", Email = "seller1@example.com" },
                new ApplicationUser { Id = "2", Email = "seller2@example.com" }
            };
            _userManagerMock.Setup(m => m.GetUsersInRoleAsync("seller")).ReturnsAsync(sellers);

            // Act
            var result = await _repository.GetAllSellers();

            // Assert
            Assert.AreEqual(2, result.Count);
            Assert.AreEqual("seller1@example.com", result[0].Email);
            Assert.AreEqual("seller2@example.com", result[1].Email);
        }

        [Test]
        public async Task GetAllBuyers_ReturnsAllBuyers()
        {
            // Arrange
            var buyers = new List<ApplicationUser>
            {
                new ApplicationUser { Id = "1", Email = "buyer1@example.com" },
                new ApplicationUser { Id = "2", Email = "buyer2@example.com" }
            };
            _userManagerMock.Setup(m => m.GetUsersInRoleAsync("buyer")).ReturnsAsync(buyers);

            // Act
            var result = await _repository.GetAllBuyers();

            // Assert
            Assert.AreEqual(2, result.Count);
            Assert.AreEqual("buyer1@example.com", result[0].Email);
            Assert.AreEqual("buyer2@example.com", result[1].Email);
        }

        [Test]
        public async Task GetUserById_ExistingUserId_ReturnsUserWithLocation()
        {
            // Arrange
            var userId = "1";
            var user = new ApplicationUser
            {
                Id = userId,
                Email = "user@example.com",
                FullName = "John Doe",
                UserName = "johndoe"
            };

            var userLocation = new UserLocation
            {
                UserId = userId,
                Address = "123 Main St",
                City = "City",
                State = "State",
                ZipCode = "12345",
                Country = "Country",
                updateAt = DateTime.UtcNow
            };

            await _context.Users.AddAsync(user);
            await _context.UserLocation.AddAsync(userLocation);
            await _context.SaveChangesAsync();

            // Act
            var result = await _repository.GetUserById(userId);

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(userId, result.UserId);
            Assert.AreEqual("John Doe", result.FullName);
            Assert.AreEqual("123 Main St", result.Address);
        }

        [Test]
        public async Task GetUserById_NonExistingUserId_ReturnsNull()
        {
            // Act
            var result = await _repository.GetUserById("nonexistent");

            // Assert
            Assert.IsNull(result);
        }
    }
}