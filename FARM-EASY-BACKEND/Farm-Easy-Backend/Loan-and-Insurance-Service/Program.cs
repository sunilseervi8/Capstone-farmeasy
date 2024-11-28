using Loan_and_Insurance_Service.DataAccess;
using Loan_and_Insurance_Service.Repository;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

namespace Loan_and_Insurance_Service
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddDbContext<LoanAndInsuranceDBContext>(options =>
           options.UseSqlServer(builder.Configuration.GetConnectionString("LoanAndInsuranceDBConnection")));


            builder.Services.AddControllers();
            builder.Services.AddScoped<ILoanRepository, LoanRepository>();

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowSpecificOrigin",
                    builder => builder
                    .WithOrigins("http://127.0.0.1:5173")
                        .AllowAnyMethod()
                        .AllowAnyHeader());
            });


            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            //builder.Services.AddSingleton<InsuranceService>();
            //builder.Services.AddSingleton<LoanService>();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseCors("AllowSpecificOrigin");

            app.UseHttpsRedirection();
            app.UseAuthentication();
            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
