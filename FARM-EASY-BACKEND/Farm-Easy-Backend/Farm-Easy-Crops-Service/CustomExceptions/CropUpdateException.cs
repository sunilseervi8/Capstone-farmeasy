namespace LMS_User_Service.CustomExceptions
{
    public class CropUpdateException : CropServiceCustomException
    {
        public CropUpdateException(string message = "Failed to update crop.") : base(message) { }

    }
}
