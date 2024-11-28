using Account_Service.CustomExceptions;
using Account_Service.DTO;
using Account_Service.Models;
using Account_Service.CustomExceptions;
using Account_Service.Repository;
using AccountService.Models;
using FirebaseAdmin.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Security.Authentication;

namespace Account_Service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountRepository _authRepository;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public AccountController(IAccountRepository authRepository, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            _authRepository = authRepository;
            _userManager = userManager;
            _roleManager = roleManager;
        }


        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDTO registerDTO)
        {
            var existingUser = await _userManager.FindByEmailAsync(registerDTO.Email);
            if (existingUser != null)
            {
                throw new UserAlreadyExistsException();
            }
            try
            {
                var (statusCode, message) = await _authRepository.Registeration(registerDTO);
                return StatusCode(statusCode, new { Message = message });
            }
            catch (UserAlreadyExistsException ex)
            {
                return Conflict(new { Message = ex.Message });
            }
            catch (AccountServiceCustomException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }


        //login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO loginDTO)
        {
            try
            {
                var (statusCode, message) = await _authRepository.Login(loginDTO);
                return StatusCode(statusCode, new { Message = message });
            }
            catch (UserNotFoundException ex)
            {
                return NotFound(new { Message = ex.Message });
            }
            catch (InvalidCredentialsException ex)
            {
                return Unauthorized(new { Message = ex.Message });
            }
            catch (AccountServiceCustomException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }
        //request seller role
        [HttpPost("request-seller-role/{userId}")]
        public async Task<IActionResult> RequestSellerRole(string userId)
        {
            try
            {
                var (statusCode, message) = await _authRepository.RequestSellerRole(userId);
                return StatusCode(statusCode, new { Message = message });
            }
            catch (UserNotFoundException ex)
            {
                return NotFound(new { Message = ex.Message });
            }
            catch (SellerRoleRequestFailedException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }

        //forgot passswor logic
        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword([FromBody] string Email)
        {
            try
            {
                var (statusCode, message) = await _authRepository.ForgotPassword(Email);
                return StatusCode(statusCode, new { Message = message });
            }
            catch (UserNotFoundException ex)
            {
                return NotFound(new { Message = ex.Message });
            }
            catch (AccountServiceCustomException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }

        //reset password
        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDTO resetPasswordDTO)
        {
            try
            {
                var (statusCode, message) = await _authRepository.ResetPassword(resetPasswordDTO);
                return StatusCode(statusCode, new { Message = message });
            }
            catch (UserNotFoundException ex)
            {
                return NotFound(new { Message = ex.Message });
            }
            catch (ResetPasswordFailedException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }

        //get all the selleers
        //[Authorize(Roles = "Admin")]
        [HttpGet("all-sellers")]
        public async Task<ActionResult<List<ApplicationUser>>> GetAllSellers()
        {
            try
            {
                var sellers = await _authRepository.GetAllSellers();
                return Ok(sellers);
            }
            catch (SellersNotFoundException ex)
            {
                return NotFound(new { Message = ex.Message });
            }
        }
        //get all the user=buyer
        [HttpGet("all-buyers")]
        public async Task<ActionResult<List<ApplicationUser>>> GetAllBuyers()
        {
            try
            {
                var buyers = await _authRepository.GetAllBuyers();
                return Ok(buyers);
            }
            catch (BuyersNotFoundException ex)
            {
                return NotFound(new { Message = ex.Message });
            }
        }
        // Get user by ID
        [HttpGet("user/{id}")]
        public async Task<ActionResult<ApplicationUser>> GetUserById(string id)
        {
            try
            {
                var user = await _authRepository.GetUserById(id);
                return Ok(user);
            }
            catch (UserNotFoundException ex)
            {
                return NotFound(new { Message = ex.Message });
            }
        }
        //delete the user
        [HttpDelete("user/{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            try
            {
                var (statusCode, message) = await _authRepository.DeleteUser(id);
                return StatusCode(statusCode, new { Message = message });
            }
            catch (UserNotFoundException ex)
            {
                return NotFound(new { Message = ex.Message });
            }
            catch (DeleteUserFailedException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }
        //approve the seller
        //[Authorize(Roles = "Admin")]
        [HttpPost("approve-seller/{id}")]
        public async Task<IActionResult> ApproveSeller(string id)
        {
            try
            {
                var (statusCode, message) = await _authRepository.ApproveSeller(id);
                return StatusCode(statusCode, new { Message = message });
            }
            catch (UserNotFoundException ex)
            {
                return NotFound(new { Message = ex.Message });
            }
            catch (ApproveSellerFailedException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }

        [HttpPut("update-location/{userId}")]
        public async Task<IActionResult> UpdateUserLocation(string userId, [FromBody] UpdateUserDTO userLocationDTO)
        {
            try
            {
                var (statusCode, message) = await _authRepository.UpdateUserLocation(userId, userLocationDTO);
                return StatusCode(statusCode, new { Message = message });
            }
            catch (UserNotFoundException ex)
            {
                return NotFound(new { Message = ex.Message });
            }
            catch (UpdateUserLocationFailedException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }


        [HttpPost("update-profile-image/{userId}")]
        public async Task<IActionResult> UpdateProfileImage(string userId, [FromQuery] string profileImg)
        {
            try
            {
                if (string.IsNullOrEmpty(profileImg))
                {
                    return BadRequest(new { Message = "Profile image URL is required." });
                }

                var result = await _authRepository.UpdateProfileImageAsync(userId, profileImg);
                if (!result)
                {
                    throw new UpdateProfileImageFailedException("Failed to update profile image.");
                }

                return Ok(new { Message = "Profile image updated successfully." });
            }
            catch (UserNotFoundException ex)
            {
                return NotFound(new { Message = ex.Message });
            }
            catch (UpdateProfileImageFailedException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }


    }
}
