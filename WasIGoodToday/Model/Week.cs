using System;
using System.Collections.Generic;
using System.Text;

namespace Model
{
    public class Week
    {
        public int Score { get; set; }
        public string ScoreImage { get; set; }
     
        public DateTime StartingDate { get; set; }

        public List<Day> Days { get; set; }
    }
}
