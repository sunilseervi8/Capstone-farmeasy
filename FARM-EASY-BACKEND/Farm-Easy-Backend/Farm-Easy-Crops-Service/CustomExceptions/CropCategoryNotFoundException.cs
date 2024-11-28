namespace LMS_User_Service.CustomExceptions
{
    public class CropCategoryNotFoundException: CropServiceCustomException
    {
        public CropCategoryNotFoundException(string message = "No crops found for the specified category.") : base(message) { }

    }
}
