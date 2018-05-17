﻿using System.Collections.Generic;

namespace sc_admin.Models
{
    public class UserModel
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        public string GivenName { get; set; }
        public string FamilyName { get; set; }
        public List<string> Roles { get; set; }
    }
}