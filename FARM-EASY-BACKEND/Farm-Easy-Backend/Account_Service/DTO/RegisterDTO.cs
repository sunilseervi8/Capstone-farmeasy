using System.ComponentModel.DataAnnotations;

namespace Account_Service.DTO
{
    public class RegisterDTO
    {
        [Required]
        public string ? FullName { get; set; }

        [Required]
        public string? Email { get; set; }

        [Required]
        public string? Password { get; set; }

        [Required]
        public string? PhoneNumber { get; set; }

        [Required]
        public string? Role { get; set; }

    }
}
