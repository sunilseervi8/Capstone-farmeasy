namespace Awareness_Feedback_Notification.Repository
{
    public interface IFeedbackRepository<T>
    {
        Task CreateAsync(T feedback);
        Task<IEnumerable<T>> GetAllAsync();
        Task<T> GetByIdAsync(string id);
        Task<bool> DeleteAsync(string id);
    }


}
