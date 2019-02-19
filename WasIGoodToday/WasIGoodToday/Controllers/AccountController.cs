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
    public class AccountController : ControllerBase
    {
        private readonly DataProvider m_DataProvider;
        public AccountController(IConfiguration configuration)
        {

            string connection = configuration.GetConnectionString("wasIgoodConnection");
            IMongoClient client = new MongoClient(connection);
            m_DataProvider = new DataProvider(client);
        }

        [HttpPost]
        public async Task<User> Post (string userName, string password)
        {
            //save user to database with hashed password
        }


        [HttpGet] //should this also be post??
        public async Task<bool> Authorise (string userName, string password)
        {

        }
    }
}