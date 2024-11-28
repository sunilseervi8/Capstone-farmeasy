using LMS_User_Service.Model;

namespace LMS_User_Service.IRepository
{
    public interface CropIRepository
    {
        IEnumerable<Crop> GetAllCrops();
        Crop GetCropById(int id);
        IEnumerable<Crop> GetCropsByCategory(string category);
        Crop AddCrop(Crop crop);
        Crop UpdateCrop(int id, Crop updatedCrop);
        bool DeleteCrop(int id);
        Task<(int, string)> SendEmailToSupplier(string email, string message);
    }
}
