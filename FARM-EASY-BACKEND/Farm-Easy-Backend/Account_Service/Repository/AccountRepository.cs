using Account_Service.Data;
using Account_Service.DTO;
using Account_Service.Models;
using AccountService.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.Extensions.Configuration;
using System.Net;
using Account_.DTO;
using Account_Service.CustomExceptions;

namespace Account_Service.Repository
{
    public class AccountRepository : IAccountRepository
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly AccountDBContext _context;
        private readonly IEmailSender _emailSender;
        public readonly IConfiguration _configuration;

        public AccountRepository(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            RoleManager<IdentityRole> roleManager,
            IConfiguration configuration,
            IEmailSender emailSender,
            AccountDBContext context)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
            _context = context;
            _configuration = configuration;
            _emailSender = emailSender;
        }

        public async Task<(int, string)> Login(LoginDTO loginDTO)
        {
            var user = await _userManager.FindByEmailAsync(loginDTO.Email);
            if (user == null)
            {
                throw new AccountServiceCustomException("User not found.");
            }
            if (user != null && user.ModeOfSign != "manual")
            {
                if (user.ModeOfSign == "google")
                {
                    throw new AccountServiceCustomException("You have signed in with Google.");
                }
                else
                {
                    throw new AccountServiceCustomException("User not found.");
                }
            }

            var result = await _signInManager.PasswordSignInAsync(user, loginDTO.Password, false, false);
            if (!result.Succeeded)
            {
                throw new AccountServiceCustomException("Invalid credentials.");
            }
            var userRoles = await _userManager.GetRolesAsync(user);
            var authClaims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Name, user.FullName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };

            if (!string.IsNullOrEmpty(user.ProfileImg))
            {
                authClaims.Add(new Claim(ClaimTypes.GivenName, user.ProfileImg));
            }
            else
            {
                if (!string.IsNullOrEmpty(user.FullName) && user.FullName.Length >= 2)
                {
                    string firstTwoLetters = user.FullName.Substring(0, 2);
                    authClaims.Add(new Claim("Initials", firstTwoLetters));
                }
                else
                {
                    throw new AccountServiceCustomException("FullName is either null or too short to extract initials.");
                }
            }
            authClaims.Add(new Claim("isVerified", user.IsVerified.ToString().ToLower()));
            foreach (var userRole in userRoles)
            {
                authClaims.Add(new Claim(ClaimTypes.Role, userRole));
            }
            string token = GenerateToken(authClaims);
            return (200, token);
        }

        public async Task<(int, string)> Registeration(RegisterDTO registerDTO)
        {
            var existingUser = await _userManager.FindByEmailAsync(registerDTO.Email);
            if (existingUser != null)
            {
                throw new AccountServiceCustomException("User with this email already exists.");
            }

            var user = new ApplicationUser
            {
                UserName = registerDTO.Email,
                Email = registerDTO.Email,
                FullName = registerDTO.FullName,
                PhoneNumber = registerDTO.PhoneNumber,
                IsVerified = registerDTO.Role == "seller" ? false : true,
                ModeOfSign = "manual"
            };

            var role = registerDTO.Role ?? Roles.User;
            if (role == Roles.User || role == Roles.Admin || role == Roles.Seller)
            {
                var result = await _userManager.CreateAsync(user, registerDTO.Password);
                if (!result.Succeeded)
                {
                    throw new AccountServiceCustomException(string.Join(", ", result.Errors.Select(e => e.Description)));
                }

                var location = new UserLocation
                {
                    UserId = user.Id,
                    Address = "",
                    City = "",
                    State = "",
                    ZipCode = "",
                    Country = ""
                };
                _context.UserLocation.Add(location);
                await _context.SaveChangesAsync();

                if (!await _roleManager.RoleExistsAsync(role))
                {
                    await _roleManager.CreateAsync(new IdentityRole(role));
                }

                await _userManager.AddToRoleAsync(user, role);
                return (200, "User registered successfully.");
            }
            throw new AccountServiceCustomException("Unauthorized Access");
        }

        public async Task<(int, string)> ForgotPassword(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                throw new AccountServiceCustomException("User not found.");
            }

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            var resetLink = $"http://localhost:5173/resetpassword/?token={(token)}&email={email}";

            await _emailSender.SendEmailAsync(email, "Password Reset Request",
                $"Please reset your password by clicking this link: <a href={resetLink}>Reset Password</a>");

            return (200, "Password reset link has been sent to your email.");
        }

        public async Task<(int, string)> ResetPassword(ResetPasswordDTO resetPasswordDTO)
        {
            var user = await _userManager.FindByEmailAsync(resetPasswordDTO.Email);
            if (user == null)
            {
                throw new UserNotFoundException();
            }
            var result = await _userManager.ResetPasswordAsync(user, resetPasswordDTO.Token, resetPasswordDTO.NewPassword);
            if (!result.Succeeded)
            {
                throw new ResetPasswordFailedException(string.Join(", ", result.Errors.Select(e => e.Description)));
            }
            return (200, "Password has been successfully reset.");
        }

        public async Task<(int, string)> RequestSellerRole(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                throw new UserNotFoundException();
            }
            var isAlreadySeller = await _userManager.IsInRoleAsync(user, Roles.Seller);
            if (isAlreadySeller)
            {
                throw new SellerRoleRequestFailedException("User is already a seller.");
            }
            var sellerRole = Roles.Seller;
            if (!await _roleManager.RoleExistsAsync(sellerRole))
            {
                await _roleManager.CreateAsync(new IdentityRole(sellerRole));
            }
            await _userManager.AddToRoleAsync(user, sellerRole);
            user.IsVerified = false;
            await _userManager.UpdateAsync(user);
            return (200, "Seller role requested. Pending admin approval.");
        }

        public async Task<(int, string)> ApproveSeller(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                throw new UserNotFoundException();
            }
            var isSeller = await _userManager.IsInRoleAsync(user, Roles.Seller);
            if (!isSeller)
            {
                throw new ApproveSellerFailedException("User is not a seller.");
            }
            user.IsVerified = true;
            var result = await _userManager.UpdateAsync(user);
            if (!result.Succeeded)
            {
                throw new ApproveSellerFailedException("Failed to approve seller.");
            }
            return (200, "Seller approved successfully.");
        }

        public async Task<(int, string)> DeleteUser(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                throw new UserNotFoundException();
            }
            var result = await _userManager.DeleteAsync(user);
            if (!result.Succeeded)
            {
                throw new DeleteUserFailedException("Failed to delete user. " + string.Join(", ", result.Errors.Select(e => e.Description)));
            }
            return (200, "User deleted successfully.");
        }

        public async Task<(int, string)> UpdateUserLocation(string userId, UpdateUserDTO userLocationDTO)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                throw new UserNotFoundException();
            }
            var userLocation = await _context.UserLocation.FirstOrDefaultAsync(ul => ul.UserId == userId);
            if (userLocation == null)
            {
                throw new UpdateUserLocationFailedException("User location not found.");
            }
            userLocation.Address = userLocationDTO.Address;
            userLocation.City = userLocationDTO.City;
            userLocation.State = userLocationDTO.State;
            userLocation.ZipCode = userLocationDTO.ZipCode;
            userLocation.Country = userLocationDTO.Country;
            userLocation.updateAt = DateTime.UtcNow;
            _context.UserLocation.Update(userLocation);
            await _context.SaveChangesAsync();
            return (200, "User location updated successfully.");
        }

        public async Task<bool> UpdateProfileImageAsync(string userId, string profileImageUrl)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                throw new UserNotFoundException();
            }
            user.ProfileImg = profileImageUrl;
            var result = await _userManager.UpdateAsync(user);
            if (!result.Succeeded)
            {
                throw new UpdateProfileImageFailedException("Failed to update profile image.");
            }
            return result.Succeeded;
        }

        public async Task<List<ApplicationUser>> GetAllSellers()
        {
            var sellers = await _userManager.GetUsersInRoleAsync("seller");
            if (!sellers.Any())
            {
                throw new SellersNotFoundException();
            }
            return sellers.ToList();
        }


        public async Task<List<ApplicationUser>> GetAllBuyers()
        {
            var buyers = await _userManager.GetUsersInRoleAsync("buyer");
            if (!buyers.Any())
            {
                throw new BuyersNotFoundException();
            }
            return buyers.ToList();
        }


        public async Task<UserDataDTO> GetUserById(string userId)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null)
            {
                throw new AccountServiceCustomException("User not found.");
            }

            var location = await _context.UserLocation
                .FirstOrDefaultAsync(loc => loc.UserId == userId);

            if (location == null)
            {
                throw new AccountServiceCustomException("User location not found.");
            }

            return new UserDataDTO
            {
                UserId = user.Id,
                UserName = user.UserName,
                FullName = user.FullName,
                Email = user.Email,
                Address = location.Address,
                City = location.City,
                State = location.State,
                ZipCode = location.ZipCode,
                Country = location.Country,
                UpdatedAt = location.updateAt
            };
        }

        private string GenerateToken(IEnumerable<Claim> claims)
        {
            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Issuer = _configuration["JWT:ValidIssuer"],
                Audience = _configuration["JWT:ValidAudience"],
                Expires = DateTime.UtcNow.AddHours(3),
                SigningCredentials = new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256),
                Subject = new ClaimsIdentity(claims)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
    
}
