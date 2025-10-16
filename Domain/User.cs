using System;
using Microsoft.AspNetCore.Identity;

namespace Domain;

public class User : IdentityUser
{
    public string? DisplayName { get; set; }
    public string? Bio { get; set; }
    public string? ImageUrl { get; set; }

    // Navigation properties
    public virtual ICollection<ActivityAttendee> Activities { get; set; } = [];
    public virtual ICollection<Photo> Photos { get; set; } = [];
}
