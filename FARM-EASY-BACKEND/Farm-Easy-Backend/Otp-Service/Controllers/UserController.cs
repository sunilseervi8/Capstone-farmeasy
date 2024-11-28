using DemoOtp.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DemoOtp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    
    public class UserController : ControllerBase
    {
        private readonly OTPService _otpService;
        static private string  staticOTP;
        public UserController(OTPService otpService )
        {
            _otpService = otpService;
        }
        [HttpPost("SendOtp")]
        public    IActionResult SendOtp([FromBody] string email)
        {
            if (string.IsNullOrWhiteSpace(email))
            {
                return BadRequest("Invalid email address.");
            }
            string otp =  _otpService.GenerateOTP();
            _otpService.SendOTPEmail(email, otp);
            // Store OTP in session
            HttpContext.Session.SetString("OTP", otp);
            staticOTP= otp;
            return Ok("OTP sent to your email.");
        }
        [HttpPost("VerifyOtp")]
        public   IActionResult VerifyOtp([FromBody] string enteredOtp)
        {
            string storedOtp =    HttpContext.Session.GetString("OTP");
            if (string.IsNullOrEmpty(storedOtp))
            {
                if (staticOTP == null)
                {
                    return BadRequest("OTP expired. Please request a new one.");
                }
                if (staticOTP == enteredOtp)
                {
                    return Ok("otp successfully verified");
                }
            }
            if (storedOtp == enteredOtp)
            {
                return Ok("OTP verified successfully.");
            }
            else
            {
                return BadRequest("Invalid OTP. Please try again.");
            }
        }
    }
}
