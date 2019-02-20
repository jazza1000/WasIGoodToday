using Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WasIGoodToday.Services
{
    public interface ICalendarService
    {
        Task<List<Month>> GetMonthsByYear(int year);
        Task<Month> GetMonth(string name, int year);
        Task UpsertMonth(Month month);
    }
}
