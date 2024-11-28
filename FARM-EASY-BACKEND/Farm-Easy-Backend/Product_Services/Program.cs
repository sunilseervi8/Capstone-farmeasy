
using LMS_User_Service.Helpers;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Identity.UI.Services;
using Product_Services.Controllers;
using Product_Services.DataConfig;
using Product_Services.IRepository;
using Product_Services.Services;

namespace Product_Services
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            //Connecting Product Database using MongoDB
            builder.Services.Configure<Product_DBConfig>(builder.Configuration.GetSection("MongoDBConnection"));
            builder.Services.AddScoped<IProductRepository, ProductServices>();
            builder.Services.AddTransient<IEmailSender, SMTPService>();

            //Adding cross origin 
            builder.Services.AddCors(options =>
           options.AddDefaultPolicy(builder =>
         {
             builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
         }));

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();
            app.UseCors();


            app.Run();
        }
    }
}
