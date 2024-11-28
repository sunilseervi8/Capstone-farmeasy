using AccountService.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Account_Service.Models
{
    public class UserLocation
    {
        [Key]
        public int Id { get; set; } 
        [ForeignKey("ApplicationUser")]
        public string UserId { get; set; }
        // Foreign key reference to the Identity user
        public ApplicationUser ApplicationUser { get; set; } // Navigation property

        public string? Address { get; set; }
        public string? City { get; set; }
        public string? State { get; set; }
        public string? ZipCode { get; set; }
        public string? Country { get; set; }
        public DateTime updateAt { get; set; }
    }
}
