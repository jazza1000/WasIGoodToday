using Data;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WasIGoodToday.Services
{
    public class CalendarService: ICalendarService
    {
        private readonly MongoDataProvider<Month> m_DataProvider;

        public CalendarService(IConfiguration configuration)
        {
            string connection = configuration.GetConnectionString("wasIgoodConnection");
            m_DataProvider = new MongoDataProvider<Month>(connection);
        }

        public async Task<Month> GetMonth(string name, int year)
        {
            return await m_DataProvider.GetSingle(x => x.Name.ToLower() == name.ToLower() && x.Year == year);
        }

        public async Task<List<Month>> GetMonthsByYear(int year)
        {
            return await m_DataProvider.GetMany(x => x.Year == year);
        }

        public async Task UpsertMonth(Month month)
        {
            await m_DataProvider.Upsert(month, x => x.Year == month.Year && x.Name == month.Name);
        }
    }
}
