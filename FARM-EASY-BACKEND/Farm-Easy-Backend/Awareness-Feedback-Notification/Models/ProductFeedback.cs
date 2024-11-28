using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

public class ProductFeedback
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }

    [BsonElement("UserId")]
    public string UserId { get; set; } 

    [BsonElement("ProductId")]
    public string ProductId { get; set; } 

    [BsonElement("Rating")]
    public int Rating { get; set; } // Required rating (1-5)

    [BsonElement("Comment")]
    public string Comment { get; set; } // Feedback comment

    [BsonElement("CreatedAt")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
