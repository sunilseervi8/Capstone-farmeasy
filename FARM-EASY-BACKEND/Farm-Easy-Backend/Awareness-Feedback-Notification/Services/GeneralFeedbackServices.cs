using Awareness_Feedback_Notification.DataConfig;
using Awareness_Feedback_Notification.Models;
using Awareness_Feedback_Notification.Repository;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Awareness_Feedback_Notification.Services
{
    public class GeneralFeedbackServices : IFeedbackRepository<GeneralFeedback> 
    {
        private readonly IMongoCollection<GeneralFeedback> _generalFeedback;

        public GeneralFeedbackServices(IOptions<DatabaseConfig> dbconfig)
        {
            var mongoClient = new MongoClient(dbconfig.Value.ServerURL);
            var mongoDB = mongoClient.GetDatabase(dbconfig.Value.Database);
            _generalFeedback = mongoDB.GetCollection<GeneralFeedback>(dbconfig.Value.GeneralFeedbackCollection);
        }

        public async Task CreateAsync(GeneralFeedback feedback)
        {
            feedback.CreatedAt = DateTime.UtcNow; // Set created date when feedback is added
            await _generalFeedback.InsertOneAsync(feedback);
        }

        public async  Task<bool> DeleteAsync(string id)
        {
            if (!ObjectId.TryParse(id, out var objectId))
            {
                return(false); // Handle invalid ID
            }

            var filter = Builders<GeneralFeedback>.Filter.Eq("_id", objectId);
            await _generalFeedback.DeleteOneAsync(filter);
            return(true);
        }

        public async Task<IEnumerable<GeneralFeedback>> GetAllAsync()
        {
            return await _generalFeedback.Find(_ => true).ToListAsync(); // Retrieves all general feedback
        }

        public async Task<GeneralFeedback> GetByIdAsync(string id)
        {
            if (!ObjectId.TryParse(id, out var objectId))
            {
                return null; // Handle invalid ID
            }

            var filter = Builders<GeneralFeedback>.Filter.Eq("_id", objectId);
            return await _generalFeedback.Find(filter).FirstOrDefaultAsync();
        }
    }
}
