using Account_Service.DTO;
using AccountService.Models;

namespace Account_Service.Repository
{
    public interface IGoogleOauth
{
        Task<(int, string)> GoogleAuth(GoogleAuthDTO googleOauth);
        Task<string> GenerateJwtToken(ApplicationUser user);
    }
}
