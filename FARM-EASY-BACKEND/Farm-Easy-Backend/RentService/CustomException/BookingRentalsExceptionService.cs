namespace RentService.CustomException
{
    public class BookingRentalsExceptionService: Exception
    {
        public BookingRentalsExceptionService(string message) : base(message) { }

        public BookingRentalsExceptionService(string message, Exception innerException) : base(message, innerException) { }
    }
}
