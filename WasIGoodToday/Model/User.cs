﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Model
{
    public class User
    {
        public string UserName { get; set; }

        public string Password { get; set; } //save a hash to the DB
    }
}
