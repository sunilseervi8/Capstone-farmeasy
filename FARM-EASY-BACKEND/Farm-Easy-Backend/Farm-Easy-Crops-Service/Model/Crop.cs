using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LMS_User_Service.Model
{
    public class Crop
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
      
        public string? user_id { get; set; }
        [Required]
        public string Name { get; set; }

        public string? Category { get; set; }

        public double? Quantity { get; set; }

        public string? Unit { get; set; }

        public decimal? Price { get; set; }

        public string? ImageUrl { get; set; }
    }
}
