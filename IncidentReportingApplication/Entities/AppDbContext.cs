using Microsoft.EntityFrameworkCore;
using IncidentReportingApplication.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;


namespace IncidentReportingApplication.Entities
{
    public class AppDbContext : IdentityDbContext<ApplicationUser>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }

        // Our main Incidents table
        public DbSet<Incident> Incidents { get; set; }

            protected override void OnModelCreating(ModelBuilder modelBuilder)
            {
                base.OnModelCreating(modelBuilder);

                // Optional: Configure table name and constraints
                modelBuilder.Entity<Incident>(entity =>
                {
                    entity.ToTable("Incidents");
                    entity.HasIndex(i => i.IncidentNumber).IsUnique();
                    entity.Property(i => i.Severity).HasDefaultValue("Low");
                    entity.Property(i => i.Status).HasDefaultValue("New");
                });

            modelBuilder.Entity<Incident>().HasData(
    new Incident { Id = 1, IncidentNumber = "INC-2025-0001", Title = "Incident #1 - Data Breach", Description = "This is a detailed description of incident #1 involving a hardware failure that requires attention.", Severity = "Low", Status = "New", Location = "Building 2, Floor 1", CreatedAt = new DateTime(2025, 10, 1), CreatedBy = "System", DueDate = new DateTime(2025, 10, 11), AssignedTo = "user1@company.com", ResolutionNotes = null, IsEscalated = false },
    new Incident { Id = 2, IncidentNumber = "INC-2025-0002", Title = "Incident #2 - System Failure", Description = "This is a detailed description of incident #2 involving a network issue that requires attention.", Severity = "Medium", Status = "Investigating", Location = "Building 4, Floor 2", CreatedAt = new DateTime(2025, 9, 30), CreatedBy = "System", DueDate = new DateTime(2025, 10, 8), AssignedTo = "user2@company.com", ResolutionNotes = null, IsEscalated = false },
    new Incident { Id = 3, IncidentNumber = "INC-2025-0003", Title = "Incident #3 - Data Breach", Description = "This is a detailed description of incident #3 involving a hardware failure that requires attention.", Severity = "High", Status = "Resolved", Location = "Building 1, Floor 3", CreatedAt = new DateTime(2025, 9, 28), CreatedBy = "System", DueDate = new DateTime(2025, 10, 12), AssignedTo = "user3@company.com", ResolutionNotes = null, IsEscalated = true },
    new Incident { Id = 4, IncidentNumber = "INC-2025-0004", Title = "Incident #4 - System Failure", Description = "This is a detailed description of incident #4 involving a network issue that requires attention.", Severity = "Critical", Status = "New", Location = "Building 3, Floor 1", CreatedAt = new DateTime(2025, 9, 27), CreatedBy = "System", DueDate = new DateTime(2025, 10, 14), AssignedTo = "user4@company.com", ResolutionNotes = null, IsEscalated = false },
    new Incident { Id = 5, IncidentNumber = "INC-2025-0005", Title = "Incident #5 - Data Breach", Description = "This is a detailed description of incident #5 involving a hardware failure that requires attention.", Severity = "Medium", Status = "Resolved", Location = "Building 5, Floor 2", CreatedAt = new DateTime(2025, 9, 25), CreatedBy = "System", DueDate = new DateTime(2025, 10, 6), AssignedTo = "user5@company.com", ResolutionNotes = "Resolved by user5 after investigation.", IsEscalated = true },
    new Incident { Id = 6, IncidentNumber = "INC-2025-0006", Title = "Incident #6 - System Failure", Description = "This is a detailed description of incident #6 involving a network issue that requires attention.", Severity = "High", Status = "Investigating", Location = "Building 6, Floor 3", CreatedAt = new DateTime(2025, 9, 24), CreatedBy = "System", DueDate = new DateTime(2025, 10, 11), AssignedTo = "user6@company.com", ResolutionNotes = null, IsEscalated = false },
    new Incident { Id = 7, IncidentNumber = "INC-2025-0007", Title = "Incident #7 - Data Breach", Description = "This is a detailed description of incident #7 involving a hardware failure that requires attention.", Severity = "Low", Status = "Closed", Location = "Building 7, Floor 4", CreatedAt = new DateTime(2025, 9, 22), CreatedBy = "System", DueDate = new DateTime(2025, 10, 9), AssignedTo = "user7@company.com", ResolutionNotes = null, IsEscalated = false },
    new Incident { Id = 8, IncidentNumber = "INC-2025-0008", Title = "Incident #8 - System Failure", Description = "This is a detailed description of incident #8 involving a network issue that requires attention.", Severity = "Critical", Status = "New", Location = "Building 8, Floor 1", CreatedAt = new DateTime(2025, 9, 20), CreatedBy = "System", DueDate = new DateTime(2025, 10, 13), AssignedTo = "user8@company.com", ResolutionNotes = null, IsEscalated = true },
    new Incident { Id = 9, IncidentNumber = "INC-2025-0009", Title = "Incident #9 - Data Breach", Description = "This is a detailed description of incident #9 involving a hardware failure that requires attention.", Severity = "High", Status = "Investigating", Location = "Building 9, Floor 3", CreatedAt = new DateTime(2025, 9, 18), CreatedBy = "System", DueDate = new DateTime(2025, 10, 15), AssignedTo = "user9@company.com", ResolutionNotes = null, IsEscalated = false },
    new Incident { Id = 10, IncidentNumber = "INC-2025-0010", Title = "Incident #10 - System Failure", Description = "This is a detailed description of incident #10 involving a network issue that requires attention.", Severity = "Medium", Status = "Resolved", Location = "Building 10, Floor 2", CreatedAt = new DateTime(2025, 9, 15), CreatedBy = "System", DueDate = new DateTime(2025, 10, 7), AssignedTo = "user10@company.com", ResolutionNotes = "Resolved by user10 after investigation.", IsEscalated = false }
);

        }
    }
    }


