using System;
using System.Collections.Generic;
using System.Text;
using MonthData = Data.Month;
using MonthDomain = Model.Month;

using WeekData = Data.Week;
using WeekDomain = Model.Week;

using DayData = Data.Day;
using DayDomain = Model.Day;


namespace Services
{
    public static class CalendarExtensionMethods
    {
        

        public static DayData ToData(this DayDomain domain)
        {
            DayData data = new DayData
            {
                ImagePath= domain.ImagePath,
                GoodOrNot= domain.GoodOrNot
            };
            return data;
        }

        public static WeekData ToData(this WeekDomain domain)
        {
            WeekData data = new WeekData
            {
                Score = domain.Score,
                ScoreImage = domain.ScoreImage,
                StartingDate = domain.StartingDate,
                Days = domain.Days.ConvertAll(x => x.ToData())
            };
            return data;
           
        }

        public static MonthData ToData(this MonthDomain domain)
        {
            MonthData data = new MonthData
            {
                Name = domain.Name,
                Year = domain.Year,
                Weeks = domain.Weeks.ConvertAll(x=> x.ToData()),
                Username = domain.Username

            };

            return data;
        }
    

    public static DayDomain ToDomain(this DayData data)
    {
        DayDomain domain = new DayDomain
        {
            ImagePath = data.ImagePath,
            GoodOrNot = data.GoodOrNot
        };
        return domain;
    }

        public static WeekDomain ToDomain(this WeekData data)
        {
            WeekDomain domain = new WeekDomain
            {
                Score = data.Score,
                ScoreImage = data.ScoreImage,
                StartingDate = data.StartingDate,
                Days = data.Days.ConvertAll(x => x.ToDomain())
            };
            return domain;

        }

        public static MonthDomain ToDomain(this MonthData data)
        {
            MonthDomain domain = new MonthDomain
            {
                Name = data.Name,
                Year = data.Year,
                Weeks = data.Weeks.ConvertAll(x => x.ToDomain()),
                Username = data.Username

            };

            return domain;
        }
    }


}