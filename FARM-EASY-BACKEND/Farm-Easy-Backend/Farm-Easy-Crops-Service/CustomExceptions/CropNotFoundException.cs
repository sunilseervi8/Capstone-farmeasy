namespace LMS_User_Service.CustomExceptions
{
    public class CropNotFoundException: CropServiceCustomException
    {
        public CropNotFoundException(string message = "Crop not found.") : base(message) { }

    }
}
