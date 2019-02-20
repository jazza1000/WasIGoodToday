﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
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
        


        [HttpGet("{month}/{year}")]
        public async Task<Month> Get(string month, int year)
        {
            var ret = await m_CalendarService.GetMonth(month, year);
            return ret;
        }
      //  [Route("api/calendar/monthsbyyear/{year}")]
        [HttpGet("monthsbyyear/{year}")]
        public async Task<List<Month>> GetMonthsByYear(int year)
        {
            var ret = await m_CalendarService.GetMonthsByYear(year);
            return ret;

        }

       // [Route("api/calendar/weeksbyyear/{year}")]
        [HttpGet("weeksbyyear/{year}")]
        public async Task<List<Week>> GetWeeksByYear(int year)
        {
            var ret = await m_CalendarService.GetMonthsByYear(year);
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
