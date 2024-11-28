
using Ocelot.DependencyInjection;
using Ocelot.Middleware;

namespace Farm_API_Gateway
{
    public class Program
    {
        public  static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Configuration.SetBasePath(builder.Environment.ContentRootPath).AddJsonFile("APIConfiguration.json", optional: false, reloadOnChange: true);
    
            //Adding cross origin 
            builder.Services.AddCors(options =>
           options.AddDefaultPolicy(builder =>
           {
               builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
           }));


            // Add services to the container.
            builder.Services.AddAuthorization();

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();




            builder.Services.AddOcelot();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();
            app.UseCors();

            app.UseAuthorization();
            app.UseOcelot().Wait();
            app.MapControllers();
            app.MapGet("/Hello", () => "Welcome to Gateway");


            app.Run();
        }
    }
}
