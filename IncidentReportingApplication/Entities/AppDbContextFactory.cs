using IncidentReportingApplication.Models;
using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace IncidentReportingApplication.Entities
{
    public class AppDbContextFactory : IDesignTimeDbContextFactory<AppDbContext>
    {
        public AppDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<AppDbContext>();

            // Design-time connection string
            optionsBuilder.UseSqlServer(
     "Server=DESKTOP-BUR5OAE\\SQLEXPRESS;Database=IncidentDB;Integrated Security=True;TrustServerCertificate=True;"
 );




            return new AppDbContext(optionsBuilder.Options);
        }

    }
}
