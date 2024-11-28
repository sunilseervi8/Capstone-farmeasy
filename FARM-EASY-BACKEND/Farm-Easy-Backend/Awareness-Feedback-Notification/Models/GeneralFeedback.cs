using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace Awareness_Feedback_Notification.Models
{
    public class GeneralFeedback
    {
       
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        public string UserId { get; set; }

        public string Feedback { get; set; } 

        public int? Rating { get; set; } // Optional rating (1-5)

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

}

