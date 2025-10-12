using IncidentReportingApplication.Entities;
using IncidentReportingApplication.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;

namespace IncidentReportingApplication.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class IncidentsController : ControllerBase
    {
        private readonly AppDbContext _context;
        public IncidentsController(AppDbContext context)
        {
            _context = context;
        }
        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetAll()
            => Ok(await _context.Incidents.ToListAsync());

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var incident = await _context.Incidents.FindAsync(id);
            return incident == null ? NotFound() : Ok(incident);
        }

        [HttpPost]
        public async Task<IActionResult> Create(Incident incident)
        {
            incident.IncidentNumber = $"INC-{DateTime.UtcNow:yyyy}-{Guid.NewGuid().ToString().Substring(0, 4).ToUpper()}";
            _context.Incidents.Add(incident);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), new { id = incident.Id }, incident);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Incident updated)
        {
            var incident = await _context.Incidents.FindAsync(id);
            if (incident == null) return NotFound();

            incident.Status = updated.Status;
            incident.AssignedTo = updated.AssignedTo;
            incident.ResolutionNotes = updated.ResolutionNotes;

            await _context.SaveChangesAsync();
            return Ok(incident);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var incident = await _context.Incidents.FindAsync(id);
            if (incident == null) return NotFound();
            _context.Incidents.Remove(incident);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }

}
