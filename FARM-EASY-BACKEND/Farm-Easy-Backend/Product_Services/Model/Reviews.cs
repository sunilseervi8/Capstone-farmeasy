using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System.ComponentModel.DataAnnotations;

namespace Product_Services.Model
{
    public class Reviews
    {
            [BsonId]
            [BsonRepresentation(BsonType.ObjectId)]
            public string? ReviewId { get; set; }

            [Required]
            public string? UserId { get; set; } 

            [Required]
            [Range(1, 5)]
            public int Rating { get; set; } // Rating from 1 to 5

            public string? Comment { get; set; } 

            public DateTime ReviewDate { get; set; } = DateTime.Now; // Review submission date
        }
    }


