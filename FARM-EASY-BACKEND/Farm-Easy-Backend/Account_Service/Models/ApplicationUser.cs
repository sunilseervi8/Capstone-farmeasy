using Account_Service.Models;
using Microsoft.AspNetCore.Identity;
using System;
using System.ComponentModel.DataAnnotations;

namespace AccountService.Models
{
    public class ApplicationUser : IdentityUser
    {
        [Required]
        public string FullName { get; set; }
        public bool IsVerified { get; set; } = false;
        public  string? ProfileImg { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        public string? ModeOfSign { get; set; }
        public UserLocation UserLocation { get; set; }
    }
}
