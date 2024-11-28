using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Awareness_Feedback_Notification.Models
{
    public class Video
    {


        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public string VideoUrl { get; set; }
        public DateTime PublishedAt { get; set; }
    }
}
