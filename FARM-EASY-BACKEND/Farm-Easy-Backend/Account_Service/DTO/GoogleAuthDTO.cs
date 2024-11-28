using System.ComponentModel.DataAnnotations;

namespace Account_Service.DTO
{
    public class GoogleAuthDTO
{
        
            public string ?FullName { get; set; }
            public string? Email { get; set; }
            public string? ProfileImage { get; set; }
            public string? Role { get; set; }
    }
}
