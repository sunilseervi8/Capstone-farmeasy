using System.Net.Mail;
using System.Net;

namespace DemoOtp.Service
{
    public class OTPService
    {
        private readonly IConfiguration _config;
        public OTPService(IConfiguration config)
        {
            _config = config;
        }
        public string GenerateOTP()
        {
            Random random = new Random();
            return random.Next(100000, 999999).ToString(); // 6-digit OTP
        }
        public   void SendOTPEmail(string toEmail, string otp)
        {
            var smtpSection = _config.GetSection("SMTP");
            string smtpHost = smtpSection["Host"];
            int smtpPort = int.Parse(smtpSection["Port"]);
            bool enableSSL = bool.Parse(smtpSection["EnableSSL"]);
            string userName = smtpSection["UserName"];
            string password = smtpSection["Password"];
            MailMessage message = new MailMessage
            {
                From = new MailAddress(userName),
                Subject = "Your OTP Code",
                Body = $"Your OTP Code is: {otp}"
            };
            message.To.Add(toEmail);
            SmtpClient smtpClient = new SmtpClient(smtpHost, smtpPort)
            {
                Credentials = new NetworkCredential(userName, password),
                EnableSsl = enableSSL
            };
            smtpClient.Send(message);
        }
    }
}
