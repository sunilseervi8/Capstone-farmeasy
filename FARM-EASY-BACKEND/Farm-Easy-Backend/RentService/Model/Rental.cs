using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RentService.Model
{
    public class Rental
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string? RentalId { get; set; }
        public string? UserId { get; set; }

        [Required]
        [StringLength(100)]
        public string? RentalTitle { get; set; }

        [Required]
        public string? RentalDescription { get; set; }

        [Required]
        public string? PickUpLocation { get; set; }

        public string? RentalNumberPlate { get; set; }

        [Required]
        [Range(0.01, double.MaxValue)]
        public decimal RentalPrice { get; set; }

        [Required]
        public string Image { get; set; } // Store image path or URL

       
    }
}
