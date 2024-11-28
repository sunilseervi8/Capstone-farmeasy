using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RentService.Migrations
{
    /// <inheritdoc />
    public partial class init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BookRentals",
                columns: table => new
                {
                    BookingId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    RentFrom = table.Column<DateTime>(type: "datetime2", nullable: false),
                    RentTill = table.Column<DateTime>(type: "datetime2", nullable: false),
                    RentalId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AdditionalNotes = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BookRentals", x => x.BookingId);
                });

            migrationBuilder.CreateTable(
                name: "Rentals",
                columns: table => new
                {
                    RentalId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RentalTitle = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    RentalDescription = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PickUpLocation = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RentalNumberPlate = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RentalPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Image = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rentals", x => x.RentalId);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BookRentals");

            migrationBuilder.DropTable(
                name: "Rentals");
        }
    }
}
