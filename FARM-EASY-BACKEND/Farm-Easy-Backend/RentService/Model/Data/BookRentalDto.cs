using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace RentService.Model.Data
{
    public class BookRentalDto
    {
        // Booking-specific information
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string BookingId { get; set; }


        [Required]
        [JsonConverter(typeof(JsonDateConverter))]
        public DateTime RentFrom { get; set; }

        [Required]
        [JsonConverter(typeof(JsonDateConverter))]
        public DateTime RentTill { get; set; }

        [Required]
        public string RentalId { get; set; }  // Foreign key referencing Rental

        public string AdditionalNotes { get; set; }

        // Rental-specific information
        [StringLength(100)]
        public string RentalTitle { get; set; }  // Title of the rental item

        public string UserId { get; set; }  // Owner of the rental item
    }
}
