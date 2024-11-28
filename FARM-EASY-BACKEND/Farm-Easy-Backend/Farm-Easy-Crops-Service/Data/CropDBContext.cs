using LMS_User_Service.Model;
using Microsoft.EntityFrameworkCore;

namespace LMS_User_Service.Data
{
    public class CropDBContext : DbContext
    {
        public CropDBContext(DbContextOptions<CropDBContext> options) : base(options)
        {

        }
        public DbSet<Crop> Crops { get; set; }
    }
}
