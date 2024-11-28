
using Account_Service.Data;
using Account_Service.Models;
using Account_Service.Repository;
using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using AccountService.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using JWTAuthentication;
using Microsoft.AspNetCore.Identity.UI.Services;
using Account_Service.Helpers;


namespace Account_Service
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddDbContext<AccountDBContext>(options =>
            options.UseSqlServer(builder.Configuration.GetConnectionString("AccountDBConnection")));
            

            builder.Services.AddIdentity<ApplicationUser, IdentityRole>(options =>
            {
                options.Password.RequireDigit = true;
                options.Password.RequireLowercase = true;
                options.Password.RequireUppercase = true;
                options.Password.RequiredLength = 6;
            })
            .AddEntityFrameworkStores<AccountDBContext>().AddDefaultTokenProviders();
 
            //addding the cross origin
            builder.Services.AddCors(options =>
            options.AddDefaultPolicy(builder =>
            {
                builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
            }));

            builder.Services.AddControllers();
            builder.Services.AddJwtAuthentication();
            builder.Services.AddScoped<IAccountRepository, AccountRepository>();
            builder.Services.AddScoped<IGoogleOauth, GoogleOauth>();
            builder.Services.AddTransient<IEmailSender, SMTPService>();
            var app = builder.Build();

            // Configure the HTTP request pipeline.
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

            app.UseAuthentication();
            app.UseAuthorization();

            
            app.MapControllers();

            app.Run();
        }
    }
}
