using System.ComponentModel.DataAnnotations;

namespace Account_Service.DTO
{
    public class ResetPasswordDTO
    {
        [Required]
        public string Email { get; set; }

        [Required(ErrorMessage = "Reset token is required.")]
        public string Token { get; set; } // This is the reset password token sent via email

        [Required(ErrorMessage = "New password is required.")]
        [DataType(DataType.Password)]
        [StringLength(100, ErrorMessage = "The password must be at least {2} characters long.", MinimumLength = 6)]
        public string NewPassword { get; set; }


    }
}
