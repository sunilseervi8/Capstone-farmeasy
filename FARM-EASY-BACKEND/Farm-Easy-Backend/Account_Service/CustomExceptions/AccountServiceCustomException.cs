namespace Account_Service.CustomExceptions
{
    public class AccountServiceCustomException: Exception
    {
        public AccountServiceCustomException() : base() { }

        public AccountServiceCustomException(string message) : base(message) { }

        public AccountServiceCustomException(string message, Exception innerException) : base(message, innerException) { }
    }
}
