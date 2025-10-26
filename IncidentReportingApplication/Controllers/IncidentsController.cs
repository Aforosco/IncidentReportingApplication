using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using IncidentReportingApplication.Entities;
using IncidentReportingApplication.Models;
using IncidentReportingApplication.Services;

namespace IncidentReportingApplication.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class IncidentsController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IEmailService _emailService;

        public IncidentsController(AppDbContext context, IEmailService emailService)
        {
            _context = context;
            _emailService = emailService;
        }

        // GET: api/incidents
        
        [HttpGet]
        public async Task<ActionResult<object>> GetIncidents(int page = 1)
        {
            var userEmail = User.FindFirst(ClaimTypes.Email)?.Value;
            var userRole = User.FindFirst(ClaimTypes.Role)?.Value;
            int pageSize = 10;

            IQueryable<Incident> query = _context.Incidents;

            // Filter based on role
            if (userRole != "Admin")
            {
                query = query.Where(i => i.CreatedBy == userEmail);
            }

            var totalCount = await query.CountAsync();
            var incidents = await query
                .OrderByDescending(i => i.CreatedAt)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return Ok(new
            {
                incidents = incidents,
                totalCount = totalCount,
                currentPage = page,
                pageSize = pageSize,
                totalPages = (int)Math.Ceiling(totalCount / (double)pageSize)
            });
        }
        // GET: api/incidents/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Incident>> GetIncident(int id)
        {
            var userEmail = User.FindFirst(ClaimTypes.Email)?.Value;
            var userRole = User.FindFirst(ClaimTypes.Role)?.Value;

            var incident = await _context.Incidents.FindAsync(id);

            if (incident == null)
                return NotFound();

            // Admin can view any incident, User can only view their own
            if (userRole != "Admin" && incident.CreatedBy != userEmail)
                return Forbid();

            return incident;
        }

        // POST: api/incidents
        [HttpPost]
        public async Task<ActionResult<Incident>> CreateIncident(Incident incident)
        {
            // Get authenticated user's email and ID
            var userEmail = User.FindFirst(ClaimTypes.Email)?.Value;
            var userId = User.FindFirst("uid")?.Value;

            if (string.IsNullOrEmpty(userEmail))
                return Unauthorized("User email not found in token");

            // Set CreatedBy from authenticated user (ignore any value from frontend)
            incident.CreatedBy = userEmail;
            incident.CreatedByUserId = userId;
            incident.CreatedAt = DateTime.UtcNow;

            // Auto-generate incident number
            var count = await _context.Incidents.CountAsync();
            incident.IncidentNumber = $"INC-{DateTime.UtcNow.Year}-{(count + 1):D4}";

            _context.Incidents.Add(incident);
            await _context.SaveChangesAsync();

            // Send email notification to admin
            try
            {
                await _emailService.SendIncidentCreatedEmailToAdmin(
                    incident.IncidentNumber,
                    incident.Title,
                    incident.Description,
                    incident.CreatedBy,
                    incident.CreatedAt
                );
                Console.WriteLine($"Email sent to admin for incident {incident.IncidentNumber}");
            }
            catch (Exception ex)
            {
                // Log error but don't fail the request
                Console.WriteLine($"Failed to send email notification: {ex.Message}");
            }

            return CreatedAtAction(nameof(GetIncident), new { id = incident.Id }, incident);
        }

        // PUT: api/incidents/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateIncident(int id, Incident incident)
        {
            if (id != incident.Id)
                return BadRequest();

            var userEmail = User.FindFirst(ClaimTypes.Email)?.Value;
            var userRole = User.FindFirst(ClaimTypes.Role)?.Value;

            var existingIncident = await _context.Incidents.FindAsync(id);
            if (existingIncident == null)
                return NotFound();

            // Only Admin can update any incident
         

            if (userRole != "Admin" && existingIncident.CreatedBy != userEmail)
                return Forbid();

            // Track old status for email notification
            var oldStatus = existingIncident.Status;

            // Update allowed fields
            existingIncident.Status = incident.Status;
            existingIncident.Severity = incident.Severity;
            existingIncident.AssignedTo = incident.AssignedTo;
            existingIncident.ResolutionNotes = incident.ResolutionNotes;
            existingIncident.IsEscalated = incident.IsEscalated;
            existingIncident.DueDate = incident.DueDate;
            existingIncident.updatedAt = DateTime.UtcNow;

            // Don't allow changing CreatedBy
            // existingIncident.CreatedBy stays the same

            try
            {
                await _context.SaveChangesAsync();

                // Send email notification if status changed
                if (oldStatus != existingIncident.Status)
                {
                    try
                    {
                        // Get user info for personalized email
                        var createdByUser = await _context.Users
                            .FirstOrDefaultAsync(u => u.Email == existingIncident.CreatedBy);

                        var recipientName = createdByUser?.FullName ?? existingIncident.CreatedBy;

                        await _emailService.SendIncidentStatusChangedEmail(
                            existingIncident.CreatedBy,
                            recipientName,
                            existingIncident.IncidentNumber,
                            existingIncident.Title,
                            oldStatus,
                            existingIncident.Status
                        );
                    }
                    catch (Exception ex)
                    {
                        // Log error but don't fail the request
                        Console.WriteLine($"Failed to send status change email: {ex.Message}");
                    }
                }
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!IncidentExists(id))
                    return NotFound();
                throw;
            }

            return NoContent();
        }

        // DELETE: api/incidents/5
       // [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteIncident(int id)
        {
            var incident = await _context.Incidents.FindAsync(id);
            if (incident == null)
                return NotFound();

            _context.Incidents.Remove(incident);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: api/incidents/stats
        [HttpGet("stats")]
        public async Task<ActionResult<object>> GetStats()
        {
            var userEmail = User.FindFirst(ClaimTypes.Email)?.Value;
            var userRole = User.FindFirst(ClaimTypes.Role)?.Value;

            IQueryable<Incident> query = _context.Incidents;

            // Filter by user if not admin
            if (userRole != "Admin")
            {
                query = query.Where(i => i.CreatedBy == userEmail);
            }

            var stats = new
            {
                Total = await query.CountAsync(),
                New = await query.CountAsync(i => i.Status == "New"),
                Investigating = await query.CountAsync(i => i.Status == "Investigating"),
                Resolved = await query.CountAsync(i => i.Status == "Resolved"),
                Closed = await query.CountAsync(i => i.Status == "Closed"),
                ByUser = userRole == "Admin"
                    ? await query.GroupBy(i => i.CreatedBy)
                        .Select(g => new { User = g.Key, Count = g.Count() })
                        .ToListAsync()
                    : null
            };

            return Ok(stats);
        }

        private bool IncidentExists(int id)
        {
            return _context.Incidents.Any(e => e.Id == id);
        }
    }
}