using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Model;
using MongoDB.Driver;
using Services;
using WasIGoodToday.Services;

namespace WasIGoodToday.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CalendarController : Controller
    {
        private readonly ICalendarService m_CalendarService;
        private readonly IStatisticsService m_StatisticsService;

        public CalendarController(
            IConfiguration configuration,
            ICalendarService calendarService,
            IStatisticsService statisticsService)
        {

            m_CalendarService = calendarService;
            m_StatisticsService = statisticsService;
        }

        //this needs to go into its own controller
        [HttpGet("{user}/statistics")]
        public async Task<Statistics> GatherStatistics(string user)
        {
            var statistics = await m_StatisticsService.GetStatistics(user);
            //need to pull a ll of the days into a list
            return new Statistics
            {
                CurrentRunOfBadDays = statistics.CurrentRunOfBadDays,
                CurrentRunOfGoodDays = statistics.CurrentRunOfGoodDays,
                LongestRunOfBadDays = statistics.LongestRunOfBadDays,
                LongestRunOfGoodDays = statistics.LongestRunOfGoodDays
            };
        }
        


        [HttpGet("{user}/{month}/{year}")]
        public async Task<Month> Get(string user,string month, int year)
        {
            var ret = await m_CalendarService.GetMonth(user,month, year);
            return ret;
        }
      //  [Route("api/calendar/monthsbyyear/{year}")]
        [HttpGet("monthsbyyear/{user}/{year}")]
        public async Task<List<Month>> GetMonthsByYear(string user, int year)
        {
            var ret = await m_CalendarService.GetMonthsByYear(user,year);
            return ret;

        }

       // [Route("api/calendar/weeksbyyear/{year}")]
        [HttpGet("weeksbyyear/{user}/{year}")]
        public async Task<List<Week>> GetWeeksByYear(string user, int year)
        {
            var ret = await m_CalendarService.GetMonthsByYear(user, year);
            return ret.SelectMany(x => x.Weeks).ToList();
        }

        // POST api/<controller>
        [HttpPost]
        public async Task Post([FromBody]Month month)
        {
            await m_CalendarService.UpsertMonth(month);
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}
