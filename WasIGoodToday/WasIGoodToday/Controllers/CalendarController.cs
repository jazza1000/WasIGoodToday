using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Model;
using MongoDB.Driver;
using WasIGoodToday.Services;

namespace WasIGoodToday.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CalendarController : Controller
    {
        private readonly ICalendarService m_CalendarService;
        public CalendarController(
            IConfiguration configuration,
            ICalendarService calendarService)
        {

            m_CalendarService = calendarService;
        }

        //this needs to go into its own controller
        [HttpGet("{user}/statistics")]
        public async Task<Statistics> GatherStatistics()
        {
            //need to pull a ll of the days into a list
            return new Statistics
            {
                CurrentRunOfBadDays = 0,
                CurrentRunOfGoodDays = 4,
                LongestRunOfBadDays = 5,
                LongestRunOfGoodDays = 7
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
