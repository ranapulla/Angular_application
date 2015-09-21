using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CRUD_Angular.Models
{
    public class Login
    {
        public string UserName { get; set; }

        public string Password { get; set; }

        public string Email { get; set; }

        public int Userid { get; set; }

        public bool Isactive { get; set; }
       
    }
}