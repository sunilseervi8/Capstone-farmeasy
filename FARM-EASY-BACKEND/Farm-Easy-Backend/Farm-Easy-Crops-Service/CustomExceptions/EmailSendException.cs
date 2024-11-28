namespace LMS_User_Service.CustomExceptions
{
    public class EmailSendException : CropServiceCustomException
    {
        public EmailSendException(string message = "Failed to send email to supplier.") : base(message) { }

    }
}
