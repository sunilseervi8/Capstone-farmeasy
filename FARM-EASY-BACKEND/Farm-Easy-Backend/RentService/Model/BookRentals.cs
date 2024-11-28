using RentService.Model;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using System.Text.Json;

public class BookRentals
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public string? BookingId { get; set; }

    public string? BookedByUSerId { get; set; }

    [Required]
    [JsonConverter(typeof(JsonDateConverter))]
    public DateTime RentFrom { get; set; }

    [Required]
    [JsonConverter(typeof(JsonDateConverter))]
    public DateTime RentTill { get; set; }

    [Required]
    [ForeignKey("Rental")]
    public string RentalId { get; set; }  // Foreign key referencing Rental
    public string? AdditionalNotes { get; set; }
}

public class JsonDateConverter : JsonConverter<DateTime>
{
    private readonly string _format = "dd-MM-yyyy";

    public override DateTime Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        return DateTime.ParseExact(reader.GetString(), _format, null);
    }

    public override void Write(Utf8JsonWriter writer, DateTime value, JsonSerializerOptions options)
    {
        writer.WriteStringValue(value.ToString(_format));
    }
}
