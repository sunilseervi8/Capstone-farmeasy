namespace LMS_User_Service.CustomExceptions
{
    public class CropDeletionException : CropServiceCustomException
    {
        public CropDeletionException(string message = "Failed to delete crop.") : base(message) { }

    }
}
