using Awareness_Feedback_Notification.Models;

namespace Awareness_Feedback_Notification.Repository
{
    public interface IVideoRepository
    {
        Task<IEnumerable<Video>> GetAllAsync();
        Task<IEnumerable<Video>> GetByCategoryAsync(string category);
        Task<Video> GetByIdAsync(string id);
        Task AddAsync(Video video);
        Task UpdateAsync(string id, Video video);
        Task DeleteAsync(string id);
    }
}
