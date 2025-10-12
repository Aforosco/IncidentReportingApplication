using Microsoft.AspNetCore.Identity;

namespace IncidentReportingApplication.Models
{
    public class ApplicationUser : IdentityUser
    {
        
        public string? FullName { get; set; }
    }
}

