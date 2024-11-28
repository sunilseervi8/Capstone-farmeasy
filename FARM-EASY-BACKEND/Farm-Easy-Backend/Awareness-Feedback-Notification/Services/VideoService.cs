using Awareness_Feedback_Notification.DataConfig;
using Awareness_Feedback_Notification.Models;
using Awareness_Feedback_Notification.Repository;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Awareness_Feedback_Notification.Services
{
    public class VideoService : IVideoRepository
    {
        private readonly IMongoCollection<Video> _video;

        public VideoService(IOptions<DatabaseConfig> videoConfig)
        {
            var mongoClient = new MongoClient(videoConfig.Value.ServerURL);
            var mongoDB = mongoClient.GetDatabase(videoConfig.Value.Database);
            _video = mongoDB.GetCollection<Video>(videoConfig.Value.Collection);
        }

        public async Task AddAsync(Video video)
        {
            video.PublishedAt = DateTime.UtcNow; // Set date when video is added
            await _video.InsertOneAsync(video);
        }

        public async Task DeleteAsync(string id)
        {
            if (!ObjectId.TryParse(id, out var objectId))
            {
                return; // Handle invalid ID, consider throwing an exception or returning a result
            }

            var filter = Builders<Video>.Filter.Eq("_id", objectId);
            await _video.DeleteOneAsync(filter);
        }

        public async Task<IEnumerable<Video>> GetAllAsync()
        {
            return await _video.Find(_ => true).ToListAsync(); // Retrieves all videos
        }

        public async Task<IEnumerable<Video>> GetByCategoryAsync(string category)
        {
            return await _video.Find(v => v.Category == category).ToListAsync(); // Retrieve videos by category
        }

        public async Task<Video> GetByIdAsync(string id)
        {
            if (!ObjectId.TryParse(id, out var objectId))
            {
                return null; // Handle invalid ID
            }

            var filter = Builders<Video>.Filter.Eq("_id", objectId);
            return await _video.Find(filter).FirstOrDefaultAsync(); // Retrieve video by ID
        }

        public async Task UpdateAsync(string id, Video updateVideo)
        {
            if (!ObjectId.TryParse(id, out var objectId))
            {
                return; // Handle invalid ID, consider throwing an exception or returning a result
            }

            var filter = Builders<Video>.Filter.Eq("_id", objectId);

            // Dynamically updating only the provided fields
            var update = Builders<Video>.Update.Set(v => v.PublishedAt, DateTime.UtcNow); // Always update the date posted

            if (!string.IsNullOrEmpty(updateVideo.Title))
                update = update.Set(v => v.Title, updateVideo.Title);

            if (!string.IsNullOrEmpty(updateVideo.Description))
                update = update.Set(v => v.Description, updateVideo.Description);

            if (!string.IsNullOrEmpty(updateVideo.Category))
                update = update.Set(v => v.Category, updateVideo.Category);

            if (!string.IsNullOrEmpty(updateVideo.VideoUrl))
                update = update.Set(v => v.VideoUrl, updateVideo.VideoUrl);

            await _video.UpdateOneAsync(filter, update);
        }
    }
}
