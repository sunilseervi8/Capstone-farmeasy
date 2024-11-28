using Account_Service.DTO;
using Account_Service.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Account_Service.Controllers
{
    [Route("api/[controller]")]
   [ApiController]
public class GoogleOuathController : ControllerBase
{
        private readonly IGoogleOauth _googleOauth;

        public GoogleOuathController(IGoogleOauth accountRepository)
        {
            _googleOauth = accountRepository;
        }

        [HttpPost("google-ouath")]
        public async Task<IActionResult> RegisterOrLogin([FromBody] GoogleAuthDTO dto)
        {
            var (status, message) = await _googleOauth.GoogleAuth(dto);

            if (status == 200)
            {
                return Ok(new { token = message });
            }
            return StatusCode(status, message);
        }
    }
}
