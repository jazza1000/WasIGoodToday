using System;
using System.Collections.Generic;
using System.Text;

namespace Data
{
    public class Week
    {
        public int Score { get; set; }
        public string ScoreImage { get; set; }
        //public int WeekNumber { get; set; }

        public DateTime StartingDate { get; set; }

        public List<Day> Days { get; set; }
    }
}
