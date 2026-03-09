using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

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
                name: "AspNetRoles",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    FullName = table.Column<string>(type: "text", nullable: true),
                    UserName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    Email = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "boolean", nullable: false),
                    PasswordHash = table.Column<string>(type: "text", nullable: true),
                    SecurityStamp = table.Column<string>(type: "text", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "text", nullable: true),
                    PhoneNumber = table.Column<string>(type: "text", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "boolean", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "boolean", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "boolean", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    RoleId = table.Column<string>(type: "text", nullable: false),
                    ClaimType = table.Column<string>(type: "text", nullable: true),
                    ClaimValue = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<string>(type: "text", nullable: false),
                    ClaimType = table.Column<string>(type: "text", nullable: true),
                    ClaimValue = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(type: "text", nullable: false),
                    ProviderKey = table.Column<string>(type: "text", nullable: false),
                    ProviderDisplayName = table.Column<string>(type: "text", nullable: true),
                    UserId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "text", nullable: false),
                    RoleId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "text", nullable: false),
                    LoginProvider = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Value = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Incidents",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IncidentNumber = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true),
                    Title = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: false),
                    Severity = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false, defaultValue: "Low"),
                    Status = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false, defaultValue: "New"),
                    Location = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    DueDate = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    AssignedTo = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    ResolutionNotes = table.Column<string>(type: "text", nullable: true),
                    IsEscalated = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    CreatedByUserId = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Incidents", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Incidents_AspNetUsers_CreatedByUserId",
                        column: x => x.CreatedByUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                });

            migrationBuilder.InsertData(
                table: "Incidents",
                columns: new[] { "Id", "AssignedTo", "CreatedAt", "CreatedBy", "CreatedByUserId", "Description", "DueDate", "IncidentNumber", "IsEscalated", "Location", "ResolutionNotes", "Severity", "Status", "Title" },
                values: new object[,]
                {
                    { 1, "user1@company.com", new DateTime(2025, 10, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "System", null, "This is a detailed description of incident #1 involving a hardware failure that requires attention.", new DateTime(2025, 10, 11, 0, 0, 0, 0, DateTimeKind.Unspecified), "INC-2025-0001", false, "Building 2, Floor 1", null, "Low", "New", "Incident #1 - Data Breach" },
                    { 2, "user2@company.com", new DateTime(2025, 9, 30, 0, 0, 0, 0, DateTimeKind.Unspecified), "System", null, "This is a detailed description of incident #2 involving a network issue that requires attention.", new DateTime(2025, 10, 8, 0, 0, 0, 0, DateTimeKind.Unspecified), "INC-2025-0002", false, "Building 4, Floor 2", null, "Medium", "Investigating", "Incident #2 - System Failure" },
                    { 3, "user3@company.com", new DateTime(2025, 9, 28, 0, 0, 0, 0, DateTimeKind.Unspecified), "System", null, "This is a detailed description of incident #3 involving a hardware failure that requires attention.", new DateTime(2025, 10, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), "INC-2025-0003", true, "Building 1, Floor 3", null, "High", "Resolved", "Incident #3 - Data Breach" },
                    { 4, "user4@company.com", new DateTime(2025, 9, 27, 0, 0, 0, 0, DateTimeKind.Unspecified), "System", null, "This is a detailed description of incident #4 involving a network issue that requires attention.", new DateTime(2025, 10, 14, 0, 0, 0, 0, DateTimeKind.Unspecified), "INC-2025-0004", false, "Building 3, Floor 1", null, "Critical", "New", "Incident #4 - System Failure" },
                    { 5, "user5@company.com", new DateTime(2025, 9, 25, 0, 0, 0, 0, DateTimeKind.Unspecified), "System", null, "This is a detailed description of incident #5 involving a hardware failure that requires attention.", new DateTime(2025, 10, 6, 0, 0, 0, 0, DateTimeKind.Unspecified), "INC-2025-0005", true, "Building 5, Floor 2", "Resolved by user5 after investigation.", "Medium", "Resolved", "Incident #5 - Data Breach" },
                    { 6, "user6@company.com", new DateTime(2025, 9, 24, 0, 0, 0, 0, DateTimeKind.Unspecified), "System", null, "This is a detailed description of incident #6 involving a network issue that requires attention.", new DateTime(2025, 10, 11, 0, 0, 0, 0, DateTimeKind.Unspecified), "INC-2025-0006", false, "Building 6, Floor 3", null, "High", "Investigating", "Incident #6 - System Failure" },
                    { 7, "user7@company.com", new DateTime(2025, 9, 22, 0, 0, 0, 0, DateTimeKind.Unspecified), "System", null, "This is a detailed description of incident #7 involving a hardware failure that requires attention.", new DateTime(2025, 10, 9, 0, 0, 0, 0, DateTimeKind.Unspecified), "INC-2025-0007", false, "Building 7, Floor 4", null, "Low", "Closed", "Incident #7 - Data Breach" },
                    { 8, "user8@company.com", new DateTime(2025, 9, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "System", null, "This is a detailed description of incident #8 involving a network issue that requires attention.", new DateTime(2025, 10, 13, 0, 0, 0, 0, DateTimeKind.Unspecified), "INC-2025-0008", true, "Building 8, Floor 1", null, "Critical", "New", "Incident #8 - System Failure" },
                    { 9, "user9@company.com", new DateTime(2025, 9, 18, 0, 0, 0, 0, DateTimeKind.Unspecified), "System", null, "This is a detailed description of incident #9 involving a hardware failure that requires attention.", new DateTime(2025, 10, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), "INC-2025-0009", false, "Building 9, Floor 3", null, "High", "Investigating", "Incident #9 - Data Breach" },
                    { 10, "user10@company.com", new DateTime(2025, 9, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), "System", null, "This is a detailed description of incident #10 involving a network issue that requires attention.", new DateTime(2025, 10, 7, 0, 0, 0, 0, DateTimeKind.Unspecified), "INC-2025-0010", false, "Building 10, Floor 2", "Resolved by user10 after investigation.", "Medium", "Resolved", "Incident #10 - System Failure" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserClaims_UserId",
                table: "AspNetUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserLogins_UserId",
                table: "AspNetUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "AspNetUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Incidents_CreatedByUserId",
                table: "Incidents",
                column: "CreatedByUserId");

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
                name: "AspNetRoleClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "Incidents");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "AspNetUsers");
        }
    }
}
