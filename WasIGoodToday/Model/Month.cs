using System;
using System.Collections.Generic;
using System.Text;

namespace Model
{
    public class Month
    {
     //   public string Id { get; set; }
        public string Name { get; set; }
        public int Year { get; set; }
        public List<Week> Weeks { get; set; }

        public string Username { get; set; }
    }
}
