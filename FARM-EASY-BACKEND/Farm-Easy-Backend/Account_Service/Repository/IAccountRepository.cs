using Account_.DTO;
using Account_Service.DTO;
using Account_Service.Models;
using AccountService.Models;

namespace Account_Service.Repository
{
    public interface IAccountRepository
    {
        Task<(int, string)> Login(LoginDTO loginDTO);
        Task<(int, string)> Registeration(RegisterDTO registerDTO);
        Task<(int, string)> ForgotPassword(string email);
        Task<(int, string)> ResetPassword(ResetPasswordDTO resetPasswordDTO);
        Task<(int, string)> DeleteUser(string userId);
        Task<(int, string)> ApproveSeller(string userId);
        Task<(int, string)> RequestSellerRole(string userId);
        Task<(int, string)> UpdateUserLocation(string userId, UpdateUserDTO userLocationDTO);
        Task<UserDataDTO> GetUserById(string userId);
        Task<List<ApplicationUser>> GetAllSellers();
        Task<List<ApplicationUser>> GetAllBuyers();
        Task<bool> UpdateProfileImageAsync(string userId, string profileImageUrl);
    }
}
