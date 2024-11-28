
using Awareness_Feedback_Notification.DataConfig;
using Awareness_Feedback_Notification.Models;
using Awareness_Feedback_Notification.Repository;
using Awareness_Feedback_Notification.Services;

namespace Awareness_Feedback_Notification
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            //Adding cross origin 
            builder.Services.AddCors(options =>
          options.AddDefaultPolicy(builder =>
          {
              builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
          }));
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            //Connecting Product Database using MongoDB
            builder.Services.Configure<DatabaseConfig>(builder.Configuration.GetSection("MongoDBConnection"));
            builder.Services.AddScoped<IVideoRepository, VideoService>();

            builder.Services.AddScoped<IFeedbackRepository<GeneralFeedback>, GeneralFeedbackServices>();




            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();
            app.UseCors();

            app.MapControllers();

            app.Run();
        }
    }
}
