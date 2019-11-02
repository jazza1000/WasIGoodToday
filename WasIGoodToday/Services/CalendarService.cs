using Model;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Data;
using MonthData = Data.Month;
using MonthDomain = Model.Month;
using WeekData = Data.Week;
using WeekDomain = Model.Week;

using DayData = Data.Day;
using DayDomain = Model.Day;
using Services;

namespace WasIGoodToday.Services
{
    public class CalendarService: ICalendarService
    {
        private readonly MongoDataProvider<MonthData> m_DataProvider;

        public CalendarService(IConfiguration configuration, IDataProviderFactory dataProviderFactory)
        {
            string connection = configuration.GetConnectionString("wasIgoodConnection");
            m_DataProvider = dataProviderFactory.GetDataProvider<MonthData>(connection);        }

        public async Task<MonthDomain> GetMonth(string user, string name, int year)
        {
            MonthData month= await m_DataProvider.GetSingle(x => x.Name.ToLower() == name.ToLower() && x.Year == year && x.Username==user);
            return month?.ToDomain();
        }

        public async Task<List<MonthDomain>> GetMonthsByYear(string user, int year)
        {
            List<MonthData> months= await m_DataProvider.GetMany(x => x.Year == year && x.Username == user);
            return months.ConvertAll<MonthDomain>(month=> month?.ToDomain());
        }

        public async Task UpsertMonth(MonthDomain monthDomain)
        {
            MonthData month = monthDomain.ToData();
            await m_DataProvider.Upsert(month, x => x.Year == month.Year && x.Name == month.Name );
        }
    }
}
