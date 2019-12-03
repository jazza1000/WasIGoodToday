
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
            var domainDays = months.SelectMany(x => x.Weeks).SelectMany(w => w.Days);
            int i = 0;
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
