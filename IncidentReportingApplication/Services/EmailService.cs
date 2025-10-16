using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using MimeKit.Text;

namespace IncidentReportingApplication.Services
{
    public interface IEmailService
    {
        Task SendIncidentCreatedEmailToAdmin(string incidentNumber, string title, string description,
            string createdBy, DateTime createdAt);
        Task SendIncidentStatusChangedEmail(string recipientEmail, string recipientName,
            string incidentNumber, string title, string oldStatus, string newStatus);
    }

    public class EmailService : IEmailService
    {
        private readonly IConfiguration _config;
        private readonly ILogger<EmailService> _logger;

        public EmailService(IConfiguration config, ILogger<EmailService> logger)
        {
            _config = config;
            _logger = logger;
        }

        public async Task SendIncidentCreatedEmailToAdmin(string incidentNumber, string title,
            string description, string createdBy, DateTime createdAt)
        {
            var adminEmail = _config["AdminUser:Email"];

            var subject = $"New Incident Reported: {incidentNumber}";

            var body = $@"
                <html>
                <head>
                    <style>
                        body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                        .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                        .header {{ background-color: #2563eb; color: white; padding: 20px; text-align: center; }}
                        .content {{ background-color: #f9fafb; padding: 20px; margin-top: 20px; }}
                        .field {{ margin-bottom: 15px; }}
                        .label {{ font-weight: bold; color: #4b5563; }}
                        .value {{ color: #1f2937; }}
                        .footer {{ margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 12px; }}
                    </style>
                </head>
                <body>
                    <div class='container'>
                        <div class='header'>
                            <h1>🚨 New Incident Reported</h1>
                        </div>
                        <div class='content'>
                            <div class='field'>
                                <span class='label'>Incident Number:</span>
                                <span class='value'>{incidentNumber}</span>
                            </div>
                            <div class='field'>
                                <span class='label'>Title:</span>
                                <span class='value'>{title}</span>
                            </div>
                            <div class='field'>
                                <span class='label'>Description:</span>
                                <p class='value'>{description}</p>
                            </div>
                            <div class='field'>
                                <span class='label'>Reported By:</span>
                                <span class='value'>{createdBy}</span>
                            </div>
                            <div class='field'>
                                <span class='label'>Date & Time:</span>
                                <span class='value'>{createdAt:dddd, MMMM dd, yyyy 'at' hh:mm tt}</span>
                            </div>
                        </div>
                        <div class='footer'>
                            <p>This is an automated notification from the Incident Management System.</p>
                            <p>Please log in to the system to review and take action on this incident.</p>
                        </div>
                    </div>
                </body>
                </html>
            ";

            await SendEmailAsync(adminEmail, subject, body);
        }

        public async Task SendIncidentStatusChangedEmail(string recipientEmail, string recipientName,
            string incidentNumber, string title, string oldStatus, string newStatus)
        {
            var subject = $"Incident Status Updated: {incidentNumber}";

            var statusColor = newStatus switch
            {
                "Resolved" => "#10b981",
                "Closed" => "#6b7280",
                "Investigating" => "#3b82f6",
                _ => "#f59e0b"
            };

            var body = $@"
                <html>
                <head>
                    <style>
                        body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                        .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                        .header {{ background-color: #2563eb; color: white; padding: 20px; text-align: center; }}
                        .content {{ background-color: #f9fafb; padding: 20px; margin-top: 20px; }}
                        .field {{ margin-bottom: 15px; }}
                        .label {{ font-weight: bold; color: #4b5563; }}
                        .value {{ color: #1f2937; }}
                        .status-badge {{ 
                            display: inline-block; 
                            padding: 5px 15px; 
                            border-radius: 20px; 
                            font-weight: bold;
                            color: white;
                            background-color: {statusColor};
                        }}
                        .status-change {{ 
                            text-align: center; 
                            font-size: 18px; 
                            margin: 20px 0;
                            padding: 15px;
                            background-color: white;
                            border-radius: 8px;
                        }}
                        .footer {{ margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 12px; }}
                    </style>
                </head>
                <body>
                    <div class='container'>
                        <div class='header'>
                            <h1>📋 Incident Status Updated</h1>
                        </div>
                        <div class='content'>
                            <p>Hello {recipientName},</p>
                            <p>The status of your incident has been updated.</p>
                            
                            <div class='field'>
                                <span class='label'>Incident Number:</span>
                                <span class='value'>{incidentNumber}</span>
                            </div>
                            <div class='field'>
                                <span class='label'>Title:</span>
                                <span class='value'>{title}</span>
                            </div>
                            
                            <div class='status-change'>
                                <strong>Status Changed:</strong><br/>
                                <span style='color: #6b7280;'>{oldStatus}</span>
                                <span style='font-size: 24px;'>→</span>
                                <span class='status-badge'>{newStatus}</span>
                            </div>

                            <div class='field'>
                                <span class='label'>Updated:</span>
                                <span class='value'>{DateTime.UtcNow:dddd, MMMM dd, yyyy 'at' hh:mm tt}</span>
                            </div>
                        </div>
                        <div class='footer'>
                            <p>This is an automated notification from the Incident Management System.</p>
                            <p>Please log in to the system to view full incident details.</p>
                        </div>
                    </div>
                </body>
                </html>
            ";

            await SendEmailAsync(recipientEmail, subject, body);
        }

        private async Task SendEmailAsync(string recipientEmail, string subject, string htmlBody)
        {
            try
            {
                var emailSettings = _config.GetSection("EmailSettings");

                var email = new MimeMessage();
                email.From.Add(new MailboxAddress(
                    emailSettings["SenderName"],
                    emailSettings["SenderEmail"]
                ));
                email.To.Add(MailboxAddress.Parse(recipientEmail));
                email.Subject = subject;
                email.Body = new TextPart(TextFormat.Html) { Text = htmlBody };

                using var smtp = new SmtpClient();
                await smtp.ConnectAsync(
                    emailSettings["SmtpServer"],
                    int.Parse(emailSettings["SmtpPort"]),
                    SecureSocketOptions.StartTls
                );

                await smtp.AuthenticateAsync(
                    emailSettings["Username"],
                    emailSettings["Password"]
                );

                await smtp.SendAsync(email);
                await smtp.DisconnectAsync(true);

                _logger.LogInformation($"Email sent successfully to {recipientEmail}");
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to send email to {recipientEmail}: {ex.Message}");
                throw;
            }
        }
    }
}