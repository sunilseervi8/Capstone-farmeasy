using LMS_User_Service.CustomExceptions;
using LMS_User_Service.Data;
using LMS_User_Service.IRepository;
using LMS_User_Service.Model;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LMS_User_Service.Repository
{
    public class CropRepository : CropIRepository
    {
        private readonly CropDBContext _context;
        private readonly IEmailSender _emailSender;
        public readonly IConfiguration _configuration;

        public CropRepository(IConfiguration configuration, IEmailSender emailSender, CropDBContext context)
        {
            _configuration = configuration;
            _emailSender = emailSender;
            _context = context;
        }

        public IEnumerable<Crop> GetAllCrops()
        {
            var crops = _context.Crops.ToList();
            if (!crops.Any())
            {
                throw new CropNotFoundException("No crops found in the database.");
            }
            return crops;
        }

        public Crop GetCropById(int id)
        {
            var crop = _context.Crops.FirstOrDefault(c => c.Id == id);
            if (crop == null)
            {
                throw new CropNotFoundException();
            }
            return crop;
        }

        public IEnumerable<Crop> GetCropsByCategory(string category)
        {
            var crops = _context.Crops.Where(c => c.Category == category).ToList();
            if (!crops.Any())
            {
                throw new CropCategoryNotFoundException();
            }
            return crops;
        }

        public Crop AddCrop(Crop crop)
        {
            try
            {
                _context.Crops.Add(crop);
                _context.SaveChanges();
                return crop;
            }
            catch
            {
                throw new CropAdditionException();
            }
        }

        public Crop UpdateCrop(int id, Crop updatedCrop)
        {
            var crop = _context.Crops.FirstOrDefault(c => c.Id == id);
            if (crop == null)
            {
                throw new CropNotFoundException();
            }

            try
            {
                crop.Name = updatedCrop.Name;
                crop.Category = updatedCrop.Category;
                crop.Quantity = updatedCrop.Quantity;
                crop.Unit = updatedCrop.Unit;
                crop.Price = updatedCrop.Price;
                crop.ImageUrl = updatedCrop.ImageUrl;
                _context.SaveChanges();
                return crop;
            }
            catch
            {
                throw new CropUpdateException();
            }
        }

        public bool DeleteCrop(int id)
        {
            var crop = _context.Crops.FirstOrDefault(c => c.Id == id);
            if (crop == null)
            {
                throw new CropNotFoundException();
            }

            try
            {
                _context.Crops.Remove(crop);
                _context.SaveChanges();
                return true;
            }
            catch
            {
                throw new CropDeletionException();
            }
        }

        public async Task<(int, string)> SendEmailToSupplier(string email, string message)
        {
            // Send the email
            try
            {
                await _emailSender.SendEmailAsync(email, "Account Verification Request", message);
                return (200, "Confirmation email has been sent to your email address.");
            }
            catch
            {
                throw new EmailSendException();
            }
        }
    }
}
