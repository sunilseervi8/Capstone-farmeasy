namespace LMS_User_Service.CustomExceptions
{
    public class CropServiceCustomException : Exception
    {
        public CropServiceCustomException() : base() { }

        public CropServiceCustomException(string message) : base(message) { }

        public CropServiceCustomException(string message, Exception innerException) : base(message, innerException) { }
    }
}
