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

            // Design-time connection string for PostgreSQL
            optionsBuilder.UseNpgsql(
                "Host=localhost;Port=5432;Database=incidentdb;Username=admin;Password=admin123;"
            );

            return new AppDbContext(optionsBuilder.Options);
        }
    }
}