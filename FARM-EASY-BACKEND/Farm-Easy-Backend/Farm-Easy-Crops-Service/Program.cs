
using Consul;
using LMS_User_Service.Data;
using LMS_User_Service.Helpers;
using LMS_User_Service.IRepository;
using LMS_User_Service.Repository;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.EntityFrameworkCore;

namespace LMS_User_Service
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();

            builder.Services.AddDbContext<CropDBContext>(option => option.UseSqlServer
            (builder.Configuration.GetConnectionString("UserDBConnection")));
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddScoped<CropIRepository,CropRepository>();
            builder.Services.AddTransient<IEmailSender, SMTPService>();


            builder.Services.AddCors(options =>
           options.AddDefaultPolicy(builder =>
           {
               builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
           }));


            var app = builder.Build();
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            else
            {
                app.UseSwaggerUI(options =>
                {
                    options.SwaggerEndpoint("/swagger/v1/swagger.json", "API V1");
                    options.RoutePrefix = string.Empty; // Swagger at root
                });
            }

            app.UseHttpsRedirection();
            app.UseCors();
            app.UseAuthorization();
            app.UseStaticFiles();

            app.MapControllers();

            app.Run();
        }
    }
}
