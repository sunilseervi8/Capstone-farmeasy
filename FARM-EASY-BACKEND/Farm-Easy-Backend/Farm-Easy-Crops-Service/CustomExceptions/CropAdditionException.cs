namespace LMS_User_Service.CustomExceptions
{
    public class CropAdditionException: CropServiceCustomException
    {
        public CropAdditionException(string message = "Failed to add crop.") : base(message) { }

    }
}
