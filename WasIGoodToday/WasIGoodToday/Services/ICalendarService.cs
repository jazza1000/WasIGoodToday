using Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WasIGoodToday.Services
{
    public interface ICalendarService
    {
        Task<List<Month>> GetMonthsByYear(string user, int year);
        Task<Month> GetMonth(string user, string name, int year);
        Task UpsertMonth(Month month);
    }
}
