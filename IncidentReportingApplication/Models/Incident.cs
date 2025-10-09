using System;
using System.ComponentModel.DataAnnotations;

namespace IncidentReportingApplication.Models
{
    
        public class Incident
        {
            [Key]
            public int Id { get; set; }

            [Required]
            [MaxLength(20)]
            public string? IncidentNumber { get; set; }  // Auto-generated (e.g., INC-2025-0001)

            [Required]
            [MaxLength(100)]
            public string? Title { get; set; }

            [Required]
            [MaxLength(1000)]
            public string? Description { get; set; }

            [Required]
            [MaxLength(20)]
            public string? Severity { get; set; } = "Low";  // Low, Medium, High, Critical

            [Required]
            [MaxLength(20)]
            public string? Status { get; set; } = "New";   // New, Investigating, Resolved, Closed

            [MaxLength(200)]
            public string? Location { get; set; }

            public DateTime CreatedAt { get; set; }
            public DateTime? DueDate { get; set; }

            [MaxLength(100)]
            public string? AssignedTo { get; set; }

            public string? ResolutionNotes { get; set; }
            public bool IsEscalated { get; set; } = false;
        }
    }



