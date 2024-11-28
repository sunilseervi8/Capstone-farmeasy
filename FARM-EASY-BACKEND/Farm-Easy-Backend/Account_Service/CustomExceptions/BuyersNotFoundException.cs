namespace Account_Service.CustomExceptions
{
    public class BuyersNotFoundException : AccountServiceCustomException
    {
        public BuyersNotFoundException(string message = "No buyers found.") : base(message) { }

    }
}
