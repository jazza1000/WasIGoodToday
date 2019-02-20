using System;
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
    public class AccountController : ControllerBase
    {
        private readonly IUserService m_UserService;
        public AccountController(IConfiguration configuration, IUserService userService)
        {

            m_UserService = userService;
        }

        [HttpPost]
        public async Task<User> Post (string userName, string password)
        {
            //save user to database with hashed password
            return await m_UserService.CreateUser(userName, password);
        }


        [HttpPost("Authenticate")] //should this also be post??
        public async Task<bool> Authenticate (string userName, string password)
        {
            return await m_UserService.Authenticate(userName, password);
        }
    }
}