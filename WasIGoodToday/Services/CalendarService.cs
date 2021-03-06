﻿using Data;
using Microsoft.Extensions.Configuration;
using Services;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MonthData = Data.Month;
using MonthDomain = Model.Month;

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
            var days = monthDomain.Weeks.SelectMany(x => x.Days);
            if (days.All(x => x.GoodOrNot == 0)) //bug where empty months overwrite data
                return;
            MonthData month = monthDomain.ToData();
            await m_DataProvider.Upsert(month, x => x.Year == month.Year && x.Name == month.Name );
        }
    }
}
