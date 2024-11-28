using Account_Service.Data;
using Account_Service.DTO;
using Account_Service.Models;
using AccountService.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Account_Service.Repository
{
    public class GoogleOauth : IGoogleOauth
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly AccountDBContext _context;
        private readonly IConfiguration _configuration;

        public GoogleOauth(
            UserManager<ApplicationUser> userManager,
            RoleManager<IdentityRole> roleManager,
            AccountDBContext context,
            IConfiguration configuration)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _context = context;
            _configuration = configuration;
        }

        public async Task<(int, string)> GoogleAuth(GoogleAuthDTO dto)
        {
            // Check if the user already exists
            var user = await _userManager.FindByEmailAsync(dto.Email);

            if (user != null)
            {
                if (user.ModeOfSign == "google")
                {
                    // Generate JWT token for existing user
                    var token = await GenerateJwtToken(user);
                    return (200, token);
                }
                else if (user.ModeOfSign == "manual")
                {
                    return (401, "You have manually signed in before, please use the same credentials.");
                }
                else
                {
                    return (401, "You have signed in with some other method");
                }
            }
            else
            {
                // User doesn't exist, create a new user
                var newUser = new ApplicationUser
                {
                    UserName = dto.Email,
                    Email = dto.Email,
                    FullName = dto.FullName,
                    EmailConfirmed = true,
                    ProfileImg = dto.ProfileImage,
                    IsVerified = dto.Role == "seller" ? false : true,
                    ModeOfSign = "google"
                };

                // Save the new user
                var createUserResult = await _userManager.CreateAsync(newUser);
                if (!createUserResult.Succeeded)
                {
                    return (400, string.Join(", ", createUserResult.Errors.Select(e => e.Description)));
                }

                // Set default role
                var role = Roles.User; // Default role is 'User'

                // Add role to the user
                if (!await _roleManager.RoleExistsAsync(role))
                {
                    await _roleManager.CreateAsync(new IdentityRole(role));
                }

                await _userManager.AddToRoleAsync(newUser, role);

                // Save User Location (after user creation)
                var location = new UserLocation
                {
                    UserId = newUser.Id,
                    Address = "",
                    City = "",
                    State = "",
                    ZipCode = "",
                    Country = ""
                };
                _context.UserLocation.Add(location);
                await _context.SaveChangesAsync();

                // Generate JWT token for the new user
                var token = await GenerateJwtToken(newUser);
                return (200, token);
            }
        }

        public async Task<string> GenerateJwtToken(ApplicationUser user)
        {
            var userRoles = await _userManager.GetRolesAsync(user);

            var authClaims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Name,user.FullName),
                new Claim(ClaimTypes.GivenName, user.ProfileImg),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };
            authClaims.Add(new Claim("isVerified", user.IsVerified.ToString().ToLower()));

            foreach (var userRole in userRoles)
            {
                authClaims.Add(new Claim(ClaimTypes.Role, userRole));
            }

            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Issuer = _configuration["JWT:ValidIssuer"],
                Audience = _configuration["JWT:ValidAudience"],
                Expires = DateTime.UtcNow.AddHours(3),
                SigningCredentials = new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256),
                Subject = new ClaimsIdentity(authClaims)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}
