using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IncidentReportingApplication.Models
{

    public class Incident
    {
        [Key]
        public int Id { get; set; }

        [MaxLength(20)]
        public string? IncidentNumber { get; set; }  

        [Required]
        [MaxLength(100)]
        public string? Title { get; set; }

        [Required]
        [MaxLength(1000)]
        public string? Description { get; set; }

        [Required]
        [MaxLength(20)]
        public string? Severity { get; set; } = "Low";  

        [Required]
        [MaxLength(20)]
        public string? Status { get; set; } = "New";   

        [MaxLength(200)]
        public string? Location { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
         public DateTime? updatedAt { get; set; } 

        public DateTime? DueDate { get; set; }

        [MaxLength(100)]
        public string? AssignedTo { get; set; }

        public string? ResolutionNotes { get; set; }

        public bool IsEscalated { get; set; } = false;

        
        [MaxLength(256)]
        public string? CreatedBy { get; set; }  

        
        public string? CreatedByUserId { get; set; }

        [ForeignKey("CreatedByUserId")]
        public ApplicationUser? CreatedByUser { get; set; }
    }
}
 


