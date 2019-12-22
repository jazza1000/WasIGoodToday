
using Model;
using MonthData = Data.Month;
using MonthDomain = Model.Month;
using System;
using System.Collections.Generic;
using System.Text;
using Data;
using Statistics = Model.Statistics;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;
using System.Linq;

namespace Services
{
    public class StatisticsService: IStatisticsService
    {
        private readonly MongoDataProvider<MonthData> m_DataProvider;

        public StatisticsService(IConfiguration configuration, IDataProviderFactory dataProviderFactory)
        {
            string connection = configuration.GetConnectionString("wasIgoodConnection");
            m_DataProvider = dataProviderFactory.GetDataProvider<MonthData>(connection);
        }

        public async Task<Statistics> GetStatistics(string user)
        {

            List<MonthData> months = await m_DataProvider.GetMany(x => x.Username == user);
            var domainMonths = months.Select(x => x.ToDomain());
            
            //need to prune days that are later than the currentdate
            var domainWeeks = months.SelectMany(x => x.Weeks);
            //to do this we need to extract a ew object for each day, and project the date
            //into the new object, because date is only recorded for each week
            //the Select with index parameter helps here
            var domainDays = domainWeeks.SelectMany(w => w.Days.Select(
                (d, i) => new { Date = w.StartingDate.AddDays(i), GoodOrNot = d.GoodOrNot }))
                .Where(x => x.Date < DateTime.Now)
                .OrderBy(x => x.Date); ;
         
            var good = domainDays.Aggregate(
                new { Longest = 0, Current = 0 },
                (x, y) => y.GoodOrNot > 0
                ? new { Longest = Math.Max(x.Longest, x.Current + 1), Current = x.Current + 1 }
                : new { Longest = x.Longest, Current = 0 });

            var bad = domainDays.Aggregate(
                new { Longest = 0, Current = 0 },
                (x, y) => y.GoodOrNot < 0
                ? new { Longest = Math.Max(x.Longest, x.Current + 1), Current = x.Current + 1 }
                : new { Longest = x.Longest, Current = 0 });
            //fetch the data and look for sequences
            Statistics statistics = new Statistics
            {
                CurrentRunOfBadDays = bad.Current,
                CurrentRunOfGoodDays = good.Current,
                LongestRunOfBadDays = bad.Longest,
                LongestRunOfGoodDays = good.Longest
            };
            return statistics;
        }
    }
}
