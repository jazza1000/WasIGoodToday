using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

namespace WasIGoodToday.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CalendarController : Controller
    {
        private readonly DataProvider m_DataProvider;
        public CalendarController(IConfiguration configuration)
        {

            string connection = configuration.GetConnectionString("wasIgoodConnection");
            IMongoClient client = new MongoClient(connection);
            m_DataProvider = new DataProvider(client);
        }
        // GET api/<controller>
        public IEnumerable<string> Get()
        {
            //test a post
            //Month month = new Month
            //{
            //    Name = "October",
            //    Year = 2018
            //};
            //m_DataProvider.UpsertMonth(month);
            return new string[] { "value1", "value2" };
        }


        [HttpGet("{month}/{year}")]
        public async Task<Month> Get(string month, int year)
        {
            var ret = await m_DataProvider.GetMonth(month, year);
            return ret;
        }
      //  [Route("api/calendar/monthsbyyear/{year}")]
        [HttpGet("monthsbyyear/{year}")]
        public async Task<List<Month>> GetMonthsByYear(int year)
        {
            var ret = await m_DataProvider.GetMonthsByYear(year);
            return ret;

            //return new List<Month>();
        }

       // [Route("api/calendar/weeksbyyear/{year}")]
        [HttpGet("weeksbyyear/{year}")]
        public async Task<List<Week>> GetWeeksByYear(int year)
        {
            var ret = await m_DataProvider.GetMonthsByYear(year);
            return ret.SelectMany(x => x.Weeks).ToList();
        }

        // POST api/<controller>
        [HttpPost]
        public async Task Post([FromBody]Month month)
        {
            await m_DataProvider.UpsertMonth(month);
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
