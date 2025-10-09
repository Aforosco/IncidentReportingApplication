using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace IncidentReportingApplication.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Incidents",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IncidentNumber = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Title = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: false),
                    Severity = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false, defaultValue: "Low"),
                    Status = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false, defaultValue: "New"),
                    Location = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DueDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    AssignedTo = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    ResolutionNotes = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsEscalated = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Incidents", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Incidents",
                columns: new[] { "Id", "AssignedTo", "CreatedAt", "Description", "DueDate", "IncidentNumber", "IsEscalated", "Location", "ResolutionNotes", "Severity", "Status", "Title" },
                values: new object[,]
                {
                    { 1, "user1@company.com", new DateTime(2025, 10, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "This is a detailed description of incident #1 involving a hardware failure that requires attention.", new DateTime(2025, 10, 11, 0, 0, 0, 0, DateTimeKind.Unspecified), "INC-2025-0001", false, "Building 2, Floor 1", null, "Low", "New", "Incident #1 - Data Breach" },
                    { 2, "user2@company.com", new DateTime(2025, 9, 30, 0, 0, 0, 0, DateTimeKind.Unspecified), "This is a detailed description of incident #2 involving a network issue that requires attention.", new DateTime(2025, 10, 8, 0, 0, 0, 0, DateTimeKind.Unspecified), "INC-2025-0002", false, "Building 4, Floor 2", null, "Medium", "Investigating", "Incident #2 - System Failure" },
                    { 3, "user3@company.com", new DateTime(2025, 9, 28, 0, 0, 0, 0, DateTimeKind.Unspecified), "This is a detailed description of incident #3 involving a hardware failure that requires attention.", new DateTime(2025, 10, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), "INC-2025-0003", true, "Building 1, Floor 3", null, "High", "Resolved", "Incident #3 - Data Breach" },
                    { 4, "user4@company.com", new DateTime(2025, 9, 27, 0, 0, 0, 0, DateTimeKind.Unspecified), "This is a detailed description of incident #4 involving a network issue that requires attention.", new DateTime(2025, 10, 14, 0, 0, 0, 0, DateTimeKind.Unspecified), "INC-2025-0004", false, "Building 3, Floor 1", null, "Critical", "New", "Incident #4 - System Failure" },
                    { 5, "user5@company.com", new DateTime(2025, 9, 25, 0, 0, 0, 0, DateTimeKind.Unspecified), "This is a detailed description of incident #5 involving a hardware failure that requires attention.", new DateTime(2025, 10, 6, 0, 0, 0, 0, DateTimeKind.Unspecified), "INC-2025-0005", true, "Building 5, Floor 2", "Resolved by user5 after investigation.", "Medium", "Resolved", "Incident #5 - Data Breach" },
                    { 6, "user6@company.com", new DateTime(2025, 9, 24, 0, 0, 0, 0, DateTimeKind.Unspecified), "This is a detailed description of incident #6 involving a network issue that requires attention.", new DateTime(2025, 10, 11, 0, 0, 0, 0, DateTimeKind.Unspecified), "INC-2025-0006", false, "Building 6, Floor 3", null, "High", "Investigating", "Incident #6 - System Failure" },
                    { 7, "user7@company.com", new DateTime(2025, 9, 22, 0, 0, 0, 0, DateTimeKind.Unspecified), "This is a detailed description of incident #7 involving a hardware failure that requires attention.", new DateTime(2025, 10, 9, 0, 0, 0, 0, DateTimeKind.Unspecified), "INC-2025-0007", false, "Building 7, Floor 4", null, "Low", "Closed", "Incident #7 - Data Breach" },
                    { 8, "user8@company.com", new DateTime(2025, 9, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "This is a detailed description of incident #8 involving a network issue that requires attention.", new DateTime(2025, 10, 13, 0, 0, 0, 0, DateTimeKind.Unspecified), "INC-2025-0008", true, "Building 8, Floor 1", null, "Critical", "New", "Incident #8 - System Failure" },
                    { 9, "user9@company.com", new DateTime(2025, 9, 18, 0, 0, 0, 0, DateTimeKind.Unspecified), "This is a detailed description of incident #9 involving a hardware failure that requires attention.", new DateTime(2025, 10, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), "INC-2025-0009", false, "Building 9, Floor 3", null, "High", "Investigating", "Incident #9 - Data Breach" },
                    { 10, "user10@company.com", new DateTime(2025, 9, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), "This is a detailed description of incident #10 involving a network issue that requires attention.", new DateTime(2025, 10, 7, 0, 0, 0, 0, DateTimeKind.Unspecified), "INC-2025-0010", false, "Building 10, Floor 2", "Resolved by user10 after investigation.", "Medium", "Resolved", "Incident #10 - System Failure" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Incidents_IncidentNumber",
                table: "Incidents",
                column: "IncidentNumber",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Incidents");
        }
    }
}
